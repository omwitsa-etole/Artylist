from flask import Flask,render_template, request, session, jsonify,redirect
import json
from keys import Key
from models import *
from datetime import date, timedelta

app = Flask(__name__)

app.secret_key = "secret key"


@app.route("/api/getCode",methods=["POST"])
def getCode():
    return jsonify({})

@app.route("/api/store/getProduct/<int:id>",methods=["GET","POST"])
async def getProduct(id):
    company = await Company.get_companies()
    groups = await Products.get_groups()
    product = await Products.find(id,companies=company,groups=groups)

    return jsonify({"data":product})


@app.route("/api/user/getWish",methods=["POST","GET"])
async def getWish():
    user_id = 0
    if session.get("user"):
        user_id = session['user']['user_id']
    company = await Company.get_companies()
    groups = await Products.get_groups()
    products = await Products.get_products(groups=groups,companies=company)
    orders = await Order.get_wish(user_id,groups=groups,companies=company,products=products)
    
    #print(products)
    result = {"data":orders,'groups':groups,"total":len(orders)}
    return jsonify(result)

@app.route("/api/store/getAll",methods=["POST","GET"])
async def getArt():
    company = await Company.get_companies()
    groups = await Products.get_groups()
    products = await Products.get_products(groups=groups,companies=company)
    
    #print(products)
    result = {"data":products,'groups':groups,"total":len(products)}
    return jsonify(result)


@app.route("/api/store/addWish",methods=["POST","GET"])
async def addWish():
    id = request.args.get("id")
    user_id = None
    if request.method == "POST":
        data = request.json
        id = data["item_id"]
        user_id = data["user_id"]
    product = await Products.find(id)
    #print("cart",user_id,product)
    if product == None:
        return jsonify({'message':"Item not found","status": 1})
    print("user_id",user_id)
    if user_id:
        if int(user_id) < 1:
            return jsonify({'message':"Login to add items to wishlist"})
        cart = await Order.add_wish(product,user_id)
        print("wish",cart)
        return jsonify(cart)
    return jsonify(product)
@app.route("/api/store/deleteCart",methods=["POST","GET"])
async def deleteCart():
    id = request.args.get("id")
    user_id = None
    if request.method == "POST":
        data = request.json
        id = data["id"]
        user_id = data["user_id"]
    product = await Cart.find_one(id)
    print("cart",user_id,product)
    if product == None:
        return jsonify({'message':"Item not found","status": 1})
    #print("user_id",user_id)
    if user_id:
        if int(user_id) < 1:
            return jsonify({'message':"Login to modify cart","status":1})
        cart = await Cart.delete(product['id'],user_id)
        
        items = await Cart.find(user_id)
        if cart:
            return jsonify({'message':"Item removed from cart","status":0,"cart":items})
    return jsonify({'message':"Invalid or anaouthorised request","status":1})

@app.route("/api/store/addCart",methods=["POST","GET"])
async def addCart():
    id = request.args.get("id")
    user_id = None
    if request.method == "POST":
        data = request.json
        id = data["item_id"]
        user_id = data["user_id"]
    product = await Products.find(id)
    #print("cart",user_id,product)
    print("user_id",user_id)
    if user_id:
        if int(user_id) < 1:
            return jsonify({'message':"Login to add items to cart"})
        cart = await Cart.add(product,user_id)
        print("cart",cart)
        return jsonify(cart)
    return jsonify(product)
    pass

@app.route("/logout")
def logout():
    session.clear()
    return redirect("login")

@app.route("/api/get_companies",methods=["POST"])
async def getCompanies():
    if session.get("user") != None:
        companies = await Company.get_companies()
        return jsonify({"data":companies})
    return jsonify({"message":"Anaouthorised request","data":None})

@app.route("/api/login/get_code",methods=["POST"])
async def loginCode():
    data = {'user_id':None}
    if request.method == "POST":
        data = request.json
    if request.args.get("user_id") == None:
        return jsonify({'status':1,'message':"Invalid arguments"})
    user_id = request.args.get('user_id') if request.args.get('user_id') != None else data['user_id']
    print("userid",user_id)
    user = await User.getCode(user_id)
    if user == None:
        return jsonify({'status':1,'message':"User not found"})
    
    user["status"]  = 0
    print(user)
    return jsonify(user)

@app.route("/api/user/setpickup",methods=["POST"])
async def setPickup():
    if session.get("user") != None:
        data = request.json
        if data.get('company') == None:
            return jsonify({"status":1,"message":"Missing Company id"})
        user_id = session["user"]["user_id"]
        company = await Company.find(data.get('company'))
        #print("company",company)
        if company == None:
            return jsonify({"status":1,"message":"Company not found or does not offer pickup services"})
        if company['is_pickup'] == False:
            return jsonify({"status":1,"message":"Company  does not offer pickup services"})
        result = await User.set_pickup(user_id,company)
        print("result",result)
        if result:
            return jsonify({"status":0,"message":"Pickup added to user profile"})
    return jsonify({"status":1,"message":"Incomplete or Invalid request"})

@app.route("/api/login",methods=["POST"])
async def apiLogin():
    data = request.json
    user = await User.validate(data['username_email'],data['password'])
    print("user",user)
    if user == None:
        return jsonify({'status':1,'message':"User not found"})
    if user['user_id'] != None:
        session["user"] = user
        user["status"]  = 0
    else:
        user['status'] = 1
    print(user)
    return jsonify(user)

@app.route("/create",methods=['GET','POST'])
@app.route("/signup",methods=['GET','POST'])
async def register():
    if request.method == "POST":
        name = request.form['firstname'] + " "+ request.form['lastname']
        email = request.form['email']
        username = request.form['username']
        address = request.form['address']
        gender = request.form['gender']
        mobile = request.form['mobile']
        password = None
        if len(mobile) < 10 or len(mobile) > 12:
            msg = "Invalid Phone Number"
            return render_template("register.html",msg=msg)
        if mobile.startswith("0") and len(mobile) == 10:
            mobile = "254" + mobile[1:]
        user = await User.create_user(username,email,password,mobile,address,name,gender)
        if user['status'] != 0:
            return render_template("register.html",msg=user['message'])
        else:
            return redirect("login?msg="+user['message'])
    return render_template("register.html",msg=None)

@app.route("/register")
@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/gallery_js")
def gallery():
    return render_template("js/gallery.js")

@app.route("/store")
@app.route("/shop")
@app.route("/home")
def landing():
    user_id = 0
    if session.get("user") != None:
        user_id = session.get("user")['user_id']
    return render_template("home.html",user_id=user_id)

@app.route("/")
def onboard():
    if session.get("user") != None:
        return redirect("home")
    return render_template("onboarding.html")

@app.route("/edit")
@app.route("/edit-profile")
async def edit():
    user_id = 0
    if session.get("user"):
        user_id = session["user"]["user_id"]
    payment_methods = await Company.get_payments()
    profile = await User.get_profile(user_id,payment_methods=payment_methods)
    product_groups = await Products.get_groups()
    return render_template("edit-profile.html",**locals())

@app.route("/orders")
@app.route("/cart")
async def cart():
    if session.get("user") == None:
        return redirect("login")
    user_id = session.get("user")['user_id']
    items = await Cart.find(user_id)
    orders = await Order.get_orders(user_id)
    companies = await Company.get_companies()
    profile = await User.get_profile(user_id,payment_methods=None,companies=companies)
    current_date = date.today()
    future_date = current_date + timedelta(days=5)
    total = 0
    shipping = 0
    for i in items:
        total += i['unit_price'] - i['discount_amount']
    print(items,orders)
    return render_template("cart.html",**locals())

@app.route("/detail/<int:id>")
async def detail(id):
    company = await Company.get_companies()
    groups = await Products.get_groups()
    products = await Products.find(id,groups=groups,companies=company)
    user_id = 0
    if session.get("user"):
        user_id = session["user"]["user_id"]
    return jsonify(**locals())

@app.route("/profile-detail.html")
@app.route("/profile/<int:id>")
async def profileDetail(id):
    if id:
        profile = await Company.find(id)
        groups = await Company.get_groups(id)
        products = await Company.get_products(id)
        print("profile",profile)
        #print("groups",groups)
    return render_template("profile-detail.html",**locals())

@app.route("/invoice/<int:id>")
async def orderDetail(id):
    if id:
        order = await Order.find(id)
        items = await Cart.find_orders(id)
        print("order",order)
        #print("items",items)
    return render_template("invoice.html",**locals())


@app.route("/wishlist")
async def wish():
    if session.get("user") == None:
        return redirect("login")
    user_id = session['user']['user_id']
    company = await Company.get_companies()
    groups = await Products.get_groups()
    products = await Products.get_products(groups=groups,companies=company)
    orders = await Order.get_wish(user_id,groups=groups,companies=company,products=products)
    user_id = 0
    if session.get("user"):
        user_id = session["user"]["user_id"]
    return render_template("wishlist.html",**locals())

@app.route("/checkout",methods=["GET","POST"])
async def checkout():
    if session.get("user") == None:
        return redirect("login")
    user_id = session.get("user")['user_id']
    
    items = await Cart.find(user_id)
    orders = await Order.get_orders(user_id)
    today = date.today()
    total = 0
    shipping = 0
    discounts = 0
    taxes = 0
    for i in items:
        discounts += i['discount_amount']
        taxes += i['unit_price']*i['tax_rate']
        total += i['unit_price'] - i['discount_amount']
    order_id = await Order.get_next()
    if request.method == "POST" and 'checkout_id' in request.form:
        checkout_id = request.form['checkout_id']
        merchant_id = request.form['merchant_id']
        amount = request.form['amount_paid']
        
        new_order = await Order.add(user_id=user_id,cart=items,checkout=checkout_id,merchant=merchant_id,amount_paid=amount,customer=session['user']['username'])
    #order_id = "SN8478042099"
    return render_template("checkout.html",**locals())

@app.route("/explore")
async def explore():
    company = await Company.get_companies()
    groups = await Products.get_groups()
    products = await Products.get_products(groups=groups,companies=company)
    user_id = 0
    if session.get("user"):
        user_id = session["user"]["user_id"]
    return render_template("explore.html",**locals())

@app.route("/settings")
@app.route("/setting")
async def setting():
    user_id = 0
    if session.get("user"):
        user_id = session["user"]["user_id"]
    profile = await User.get_profile(user_id)
    return render_template("setting.html",**locals())

@app.route("/profile")
async def profile():
    user_id = 0
    if session.get("user"):
        user_id = session["user"]["user_id"]
    profile = await User.get_profile(user_id)
    orders = await Order.get_orders(user_id)
    print(profile,orders)
   
    return render_template("profile.html",profile=profile,orders=orders)



if __name__ == '__main__':
    app.run("0.0.0.0",debug=True)