from db import *
import random

#api_url = 'http://localhost:8080/'
api_url = 'https://posdesk-8a71a5fe3d60.herokuapp.com/'
class Payments:
    def __init__(self,id,code,name,enabled,company,default,created_at,updated,deleted,user):
        self.id = id
        self.code = code
        self.name = name
        self.enabled = bool(enabled)
        self.company = company
        self.user = user
    def to_dict(self):
        return self

class Profile:
    def __init__(self,id,user_id,fullname,age,gender,address,avatar,language,payment,intersets,price_range,created,updated,delivery_address,payment_methods=None,companies=None):
        self.id = id
        self.user_id = user_id
        self.fullname = fullname
        self.age = age
        self.gender = gender
        self.address = address
        self.created_at = created
        self.avatar = avatar
        self.default_payment = payment
        self.language = language
        self.intersets = intersets.split(",")
        self.price_range = price_range.split(",")
        self.delivery_address = delivery_address
        self.delivery_company = int(delivery_address)
        if companies:
            for c in companies:
                if c['company'] == self.delivery_company or c['id'] == self.delivery_company:
                    self.delivery_company = c['name']
        if payment_methods:
            for i in payment_methods:
                if i['id'] == self.default_payment:
                    self.default_payment = i['name']
    def to_dict(self):
        return self.__dict__

class Business:
    def __init__(self,id,company,name,trade_name,address,is_default,inactive,tax_id,type,currency,email,phone,logo,is_pickup,coordinates):
        self.id = id
        self.company = company
        self.name = name
        self.trade_name = trade_name
        self.address = address
        self.is_default = bool(is_default)
        self.inactive = bool(inactive)
        self.tax_id = tax_id
        self.type = type
        self.currency = currency
        self.email = email
        self.phone = phone
        self.logo = logo
        self.is_pickup = bool(is_pickup)
        self.coordinates = coordinates.split(":")
    def to_dict(self):
        return self.__dict__

class ProductGroup:
    def __init__(self,id,name,enabled,code,default_supplier,created_user,is_default,parent,created,updated):
        self.id = id
        self.name = name
        self.enabled = bool(enabled)
        self.code = code
        self.created_by = created_user
        self.parent = parent
        self.is_default = bool(is_default)
    def to_dict(self):
        return self.__dict__

class Product:
    def __init__(self,id,company,code,group,name,quantity,enabled,is_sales,description,image,group_id,is_purchase,reorder,min,cost,price,tax_rate,discount,cashier,created,updated,deleted,groups=None,companies=None):
        self.id = id
        self.company = company
        self.item_code = code
        self.item_group = group_id
        self.description= description
        self.name = name
        self.quantity = quantity
        self.enabled = bool(enabled)
        self.is_sales = bool(is_sales)
        self.image = image if 'http' in image else api_url+image #'/static/assets/images/explore/pic5.png'
        self.is_purchase = bool(is_purchase)
        self.reorder_level = reorder
        self.min_qty = min
        self.cost_price = price
        self.unit_price = price
        self.tax_rate = tax_rate
        self.discount_rate = int(discount) / 100
        self.created_at = created
        if groups != None:
            for gr in groups:
                if gr['id'] == self.item_group:
                    self.item_group = gr['name']
        if companies != None:
            for c in companies:
                if c['company'] == self.company:
                    self.company = c['name']
    def to_dict(self):
        
        return self.__dict__
        pass

class Order_Item:
    def __init__(self,id,user_id,item_id,order_id,name,description,quantity,unit_price,tax_rate,discount_rate,discount_amount,amount,deleted,groups=None,companies=None,products=None,items=None):
        self.id = id
        self.item_id = item_id
        self.order_id = order_id
        self.description = description
        self.item_name = name
        self.name = name
        self.quantity = quantity
        self.unit_price = unit_price
        self.tax_rate = tax_rate
        self.discount_amount = discount_amount
        self.amount = amount
        self.deleted = deleted
        self.company = None
        if products:
            for p in products:
                if p['id'] == self.item_id:
                    self.name = p['name']
                    self.company = p['company']
                    self.group = p['item_group']
                    self.image = p['image']
        if items:
            for i in items:
                if i[0] == self.item_id:
                    self.image = i[1] if 'http' in i[1] else api_url+i[1]
                    self.company = i[2]
        pass
    def to_dict(self):
        return self.__dict__

class Order_Invoice:
    def __init__(self,id,user_id,company,amounts_tax,created,due,status,customer,amount_due,discount,tax_total,amount_paid,balance_due,advance_paid,paid,checkout_id,merchant_id,shipping,notes,created_at,updated_at,deleted,order_num):
        self.id = id
        self.user_id = user_id
        self.company = company
        self.amounts_tax = amounts_tax
        self.amount_paid = amount_paid
        self.amount_due = amount_due
        self.status = status
        self.paid_status = bool(paid)
        self.customer = customer
        self.discount = discount
        self.tax = tax_total
        self.checkout_id = checkout_id
        self.merchant_id = merchant_id
        self.shipping_address = shipping
        self.notes = notes
        self.created_at = created
        self.deleted = deleted
        pass
    def to_dict(self):
        return self.__dict__


class User:
    @staticmethod
    async def get_orders(user_id):
        return await Order.get_orders(user_id)
    @staticmethod
    async def update_profile(user_id,keys,values):
        query = await DatabaseManager.update(f"update user_profile set (%s) values(%s) where user_id=%d"%(keys,values,user_id))
        if newquery:
            profile = await User.get_profile(user_id)
            return profile
        else:
            return None
    @staticmethod
    async def get_profile(user_id,payment_methods=None,companies=None,count=1):
        if count > 2:
            return None
        query = await DatabaseManager.query(f"SELECT * from user_profile where user_id=%s"%user_id)
        if query:
            profile = Profile(*query[0],payment_methods=payment_methods,companies=companies)
            profile = profile.to_dict()
            return profile
        else:
            query = DatabaseManager.insert(f"INSERT INTO user_profile (user_id,interests) VALUES (%d, 'all')"%user_id)
            profile = await User.get_profile(user_id,payment_methods=payment_methods,companies=companies,count=count+1)
            return profile
            
    @staticmethod
    async def create_user(username,email,password,mobile,address,fullname,gender):
        query = await DatabaseManager.query(f"select * from users where username='%s'"%username)
        if query and len(query) > 0:
            return {'message':'User already exists','status': 1}
        query = await DatabaseManager.query(f"select * from users where email='%s'"%email)
        if query and len(query) > 0:
            return {'message':'User with email already exists','status': 1}
        query = await DatabaseManager.query(f"select * from users where mobile='%s'"%mobile)
        if query and len(query) > 0:
            return {'message':'User with mobile already exists','status': 1}
        new = DatabaseManager.insert(f"insert into users (company,username,email,mobile,password,group_id,user_id) values(1000,'%s','%s','%s','%s',%d,'0')"%(username,email,mobile,password,3))
        if new:
            new = await DatabaseManager.query(f"select * from users where email='%s'"%email)
            if new is None or len(new) == 0:
                return {'message':'Error inserting record, try again','status': 1}
            new = new[0]
            profile = DatabaseManager.insert(f"insert into user_profile (user_id,address,fullname,gender,language,interests) values('%s','%s','%s','%s','English','all')"%(new[0],address,fullname,gender))
            return {'message':'New User account created, login to continue','status': 0} 
        pass
    @staticmethod
    async def validate(username,password):
        code = random.randint(1001,9999)
        query = await DatabaseManager.query(f"SELECT * from users where username='%s'or email='%s' or mobile='%s'" % (username,username,username))
        if query == None or len(query) == 0:
            return None
        user = query[0]
        profile = None
        if user[0]:
            profile = await DatabaseManager.query(f"SELECT * from user_profile where user_id=%d"%user[0])
            if profile == None or len(profile) == 0:
                new_profile = DatabaseManager.insert(f"INSERT INTO user_profile (user_id,interests) VALUES (%d,'all')"%user[0])
                if new_profile:
                    profile = await DatabaseManager.query(f"SELECT * from user_profile where user_id=%d"%user[0])
                    if profile:
                        profile = profile[0] if isinstance(profile,tuple) else ()
        #newquery = DatabaseManager.update(f"UPDATE users set login_code='%s' where id=%d"%(code,user[0]))
        #if newquery == None or newquery == False:
        #    return None
        #if profile:
        #    profile = Profile(*profile)
        #    profile = profile.to_dict()
            print("validate",password==str(user[5]),str(user[4])==password,password,user[5])
            if str(user[5]) == str(password) or str(user[4]) == str(password):
                return {'user_id':user[0],'username':user[2],'mobile':user[3],'email':user[6],'message':'Login Successfull'}
            else:
                return {'user_id':None,'message':'Invalid Credentials passed'}
        else:
            return {'user_id':None,'message':'User not found'}
    @staticmethod
    async def getCode(user_id):
        query = await DatabaseManager.query(f"SELECT login_code,mobile,email,id from users where email='%s' or mobile='%s' or username='%s'" % (user_id,user_id,user_id))
        if query == None or len(query) == 0:
            return None
        query = query[0]
        code = query[0]
        if query:
            new_code = random.randint(1001,9999)
            newquery = DatabaseManager.update(f"UPDATE users set login_code='%s' where id=%d"%(new_code,query[3]))
            print("update",newquery)
            if newquery == None:
                return None
            code = new_code
        mobile = query[1]
        email = query[2]
        newcode = ''
        for i in str(code):
            newcode = ""+i
        return {'code':code,'mobile':mobile,'email':email}
    @staticmethod
    async def set_pickup(user_id,company):
        query = DatabaseManager.update(f"update user_profile set delivery_company='%s' where user_id=%d"%(company['company'],user_id))
        if query == None:
            return None
        return query


class Company:
    @staticmethod
    async def find(id):
        results = await DatabaseManager.query("SELECT * from business where id='%s' or company='%s'"%(id,id))
        if results == None or len(results) == 0:
            return None
        
        business = Business(*results[0])
        return business.to_dict()
        #return bs
    @staticmethod
    async def get_companies():
        results = await DatabaseManager.query("SELECT * from business")
        if results == None or len(results) == 0:
            return []
        bs = []
        for b in results:
            business = Business(*b)
            bs.append(business.to_dict())
        return bs

    @staticmethod
    async def get_payments():
        results = await DatabaseManager.query("SELECT * from payment_method")
        if results == None or len(results) == 0:
            return []
        bs = []
        for b in results:
            pm = Payments(*b)
            bs.append(pm.to_dict())
        ls_1 = []
        ls_2 = []
        for b in bs:
            if b['name'] not in ls_1:
                ls_1.append(b['name'])
                ls_2.append(b)
        bs = ls_2
        return bs
class Products:
    @staticmethod
    async def get_products(groups=None,companies=None):
        results = await DatabaseManager.query('SELECT * from product_item where deleted_at is null')
        #print(results)
        if results == None:
            return []
        rs = []
        for r in results:
            result = Product(*r,groups=groups,companies=companies)
            r = result.to_dict()
            rs.append(r)
        return rs
    @staticmethod
    async def get_groups():
        results = await DatabaseManager.query('SELECT * from product_group')
        #print(results)
        if results == None:
            return []
        rs = []
        for r in results:
            result = ProductGroup(*r)
            r = result.to_dict()
            rs.append(r)
        return rs
        pass
    @staticmethod
    async def find(id,groups=None,companies=None):
        result = await DatabaseManager.query(f"SELECT * FROM product_item WHERE id=%s" % id)
        if result == None or len(result) == 0:
            return None
        print(result)
        r = Product(*result[0],groups=groups,companies=companies)
        return r.to_dict()

class Cart:
    @staticmethod
    async def add(item,user_id,qty=1):
        #print("query",(f"INSERT INTO sales_order_item (user_id,item_id, order_id,description,quantity,unit_price,tax_rate,discount_rate,discount_amount,amount) VALUES (%s,%d, %s,'%s','%s','%s','%s','%s','%s','%s')"%(user_id,item['id'],None,item['description'],qty,item['unit_price'],item['tax_rate'],item['discount_rate'],item['discount_rate']*(item['unit_price']*qty),item['unit_price']*qty)))
        query = DatabaseManager.insert(f"INSERT INTO sales_order_item (user_id,item_id,item_name, description,quantity,unit_price,tax_rate,discount_rate,discount_amount,amount,company) VALUES (%s,%d,'%s','%s','%s','%s','%s','%s','%s','%s',%d)"%(user_id,item['id'],item['name'],item['description'],qty,item['unit_price'],item['tax_rate'],item['discount_rate'],item['discount_rate']*(item['unit_price']*qty),item['unit_price']*qty,int(item['company'])))
        if query == None:
            return None
        return await Cart.find(user_id)
        pass
    @staticmethod
    async def find(user_id):
        images = await DatabaseManager.query(f"SELECT id,image_path,company from product_item where deleted_at is NULL")

        query = await DatabaseManager.query(f"SELECT * FROM sales_order_item WHERE user_id=%s" % user_id)
        if query == None or len(query) == 0:
            return []
        rs = []
        
        for r in query:
            r = Order_Item(*r,items=images)
            rs.append(r.to_dict())
        return rs
        pass
    @staticmethod
    async def find_one(id):
        query = await DatabaseManager.query(f"SELECT * FROM sales_order_item WHERE id=%s" % id)
        if query == None or len(query) == 0:
            return None
        r = Order_Item(*query[0])
        return r.to_dict()
    @staticmethod
    async def delete(uid,user_id):
        query = await DatabaseManager.query(f"DELETE FROM sales_order_item where id='%s' and user_id='%s'" % (uid,user_id))
        if query != None:
            return True
        else:
            return False
    @staticmethod
    async def delete_all(user_id):
        query = await DatabaseManager.query(f"DELETE FROM sales_order_item where user_id=%s" % user_id)
        if query != None:
            return True
        else:
            return False

    @staticmethod
    async def update_all(user_id,order_id,cart=None):
        if not cart:
            cart = await Cart.find(user_id)
        query = DatabaseManager.update(f"update sales_order_item set order_id=%s where user_id=%s and order_id is NULL"%(order_id,user_id))
        if query:
            return {'status':0,'message':'Updated order items'}
        else:
            return None

class Order:
    @staticmethod
    async def add(user_id=None,cart=None,checkout=None,merchant=None,amount_paid=None):
        if user_id and amount_paid:
            if cart == None:
                cart = await Cart.find(user_id)
            total = 0
            shipping = 0
            discounts = 0
            taxes = 0
            for i in cart:
                discount += i['discount_amount']
                taxes += i['unit_price']*i['tax_rate']
                total += i['unit_price'] - i['discount_amount']
            order_id = await Order.get_next()
            query = DatabaseManager.insert(f"insert into sales_order (order_num,user_id,total,amount_paid,amounts_tax_inc,disc_total,tax_total,balance_due,advance_paid,checkout_id,merchant_id,shipping_address,notes,fdesk_user) values (%s,%s,%d,%d,%d,%d,%d,%d,%d,%s,%s,%s,%s,%s)"%(order_id,user_id,total,amount_paid,taxes,discounts,taxes,total-amount_paid,amount_paid,checokut,merchant,None,None,user_id))
            if query:
                await Cart.update_all(user_id,order_id,cart=cart)
                return await Order.find(order_id)
            else:
                return {'status': 1,'message':'Failed could not ssave order invoice'}
        else:
            return {'message':"Missing required data checkout | merchant",'status': 1}
        pass
    @staticmethod
    async def add_wish(item,user_id,qty=1):
        query_1 = await DatabaseManager.query(f"SELECT * from sales_order_wish where user_id=%s and item_id=%s and deleted_at is NULL"%(user_id,item['id']))
        if query_1 and len(query_1) > 0:
            return {'message':'Item already exists in your wishlist'}
        query = DatabaseManager.insert(f"INSERT INTO sales_order_wish (user_id,item_id, order_id,description,quantity,unit_price,tax_rate,discount_rate,discount_amount,amount) VALUES (%s,%d, '%s','%s','%s','%s','%s','%s','%s','%s')"%(user_id,item['id'],None,item['description'],qty,item['unit_price'],item['tax_rate'],item['discount_rate'],item['discount_rate']*(item['unit_price']*qty),item['unit_price']*qty))
        if query == None:
            return None
        return await Order.get_wish(user_id)
    @staticmethod
    async def find(id):
        query = await DatabaseManager.query(f"SELECT * FROM sales_order WHERE id=%s or order_num=%s" % (id,id))
        if query == None or len(query) == 0:
            return []
        r = Order_Invoice(*query[0])
        return r.to_dict()
    @staticmethod
    async def get_orders(user_id):
        results = await DatabaseManager.query(f"SELECT * from sales_order where user_id=%s" % user_id)
        #print(results)
        if results == None:
            return []
        rs = []
        for r in results:
            result = Order_Invoice(*r)
            r = result.to_dict()
            rs.append(r)
        return rs

    @staticmethod
    async def get_wish(user_id,groups=None,companies=None,products=None):
        results = await DatabaseManager.query(f"SELECT * from sales_order_wish where user_id=%s" % user_id)
        #print(results)
        if results == None:
            return []
        rs = []
        for r in results:
            result = Order_Item(*r,groups=groups,companies=companies,products=products)
            r = result.to_dict()
            rs.append(r)
        return rs

    @staticmethod
    async def get_next():
        query = await DatabaseManager.query(f"select order_num from sales_order ORDER BY order_num DESC LIMIT 1;")
        if query == None or len(query) == 0:
            return 1001
        return query[0][0]