import random


keys = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9"

class Key:
	def __init__(self,set=None,role=None,check=None,len=None,key=None):
		self.keys = keys.split(",")
		self.result = None
		length = [18,21,26,32]
		if len == None:
			self.length = random.choice(length)
		else:
			self.length = len
		self.key = []
		self.make()
		self.set(role=role)
	def __call__(self):
		return self.key
		
	def make(self):
		self.key = []
		for i in range(0,self.length):
			key = random.choice(self.keys)
			self.key.append(key)
		self.key = "".join(self.key)
		
		
	def set(self,role=None):
		pass
		
	def check(self,key,role=None):
		found = False
		self.result = found
