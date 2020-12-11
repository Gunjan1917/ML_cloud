from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
import numpy as np
from flask_pymongo import PyMongo
from pymongo import MongoClient

flask_app = Flask(__name__)
app = Api(app=flask_app,
          version="1.0",
          title="Boston Housing Prices Prediction",
          description="Predict results using a trained model")

# flask_app.config['MONGO_URI'] = 'mongodb+srv://<username>:<password>@cluster0.pnrjd.mongodb.net/<dbname>?retryWrites=true&w=majority'
# mongo = PyMongo(flask_app)
# my_collection = mongo.db.users


#hosturi  
client = MongoClient('mongodb+srv://<username>:<password>@cluster0.pnrjd.mongodb.net/<dbname>?retryWrites=true&w=majority') 
db = client.test_db    #Select the database  
#db.user_collection.insert({'name': 'user'})
          
name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params',
                  {'crim': fields.Float(required=True, description="per capita crime rate", help="This field cannot be blank"),
                   'zn': fields.Float(required=True, description="proportion of residential land", help="This field cannot be blank"),
                   'indus': fields.Float(required=True, description="proportion of non-retail business acres", help="This field cannot be blank"),
                   'chas': fields.Integer(required=True, description="Charles River dummy variable", help="This field cannot be blank"),
                   'nox': fields.Float(required=True, description="nitric oxides concentration", help="This field cannot be blank"),
                   'rm': fields.Float(required=True, description="average number of rooms", help="This field cannot be blank"),
                   'age': fields.Float(required=True, description="proportion of owner-occupied units", help="This field cannot be blank"),
                   'dis': fields.Float(required=True, description="weighted dist to 5 Boston employment centres", help="This field cannot be blank"),
                   'rad': fields.Integer(required=True, description="index of accessibility to radial highways", help="This field cannot be blank"),
                   'tax': fields.Integer(required=True, description="property-tax rate", help="This field cannot be blank"),
                   'ptratio': fields.Float(required=True, description="pupil-teacher ratio", help="This field cannot be blank"),
                   'b': fields.Float(required=True, description="proportion of blacks", help="This field cannot be blank"),
                   'lstat': fields.Float(required=True, description="lower status of the population", help="This field cannot be blank"),})

classifier = joblib.load('regression.joblib')

def index():
    formdata = request.json
    data = [float(val) for val in formdata.values()]
    query = {'crim': data[0],'zn': data[1],'indus': data[2],'chas': data[3],'nox': data[4],'rm': data[5],'age': data[6],'dis': data[7],'rad': data[8],
                   'tax': data[9],'ptratio': data[10],'b': data[11],'lstat': data[12]}
    db.user_collection.insert(query)
    output = []
    for s in db.user_collection.find().skip(db.user_collection.count()-1):
        output.append(s['crim'])
        output.append(s['zn'])
        output.append(s['indus'])
        output.append(s['chas'])
        output.append(s['nox'])
        output.append(s['rm'])
        output.append(s['age'])
        output.append(s['dis'])
        output.append(s['rad'])
        output.append(s['tax'])
        output.append(s['ptratio'])
        output.append(s['b'])
        output.append(s['lstat'])
    pred = classifier.predict(np.array(output).reshape(1, -1))
    #db.user_collection.insert({'result':pred[0]})
    #db.user_collection.remove(query)
    return pred[0]
    
  

@name_space.route("/")
class MainClass(Resource):

    def options(self):
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "*")
        return response

    @app.expect(model)
    def post(self):
        try:
            pred = index()
            pred = round(pred,2)
            # formData = request.json
            # data = [float(val) for val in formData.values()]
            # prediction = classifier.predict(np.array(data).reshape(1, -1))
            response = jsonify({
                "statusCode": 200,
                "status": "Prediction made",
                "result": "Predicted price in $: " + str(pred)
            })
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        except Exception as error:
            return jsonify({
                "statusCode": 500,
                "status": "Could not make prediction",
                "error": str(error)
            })
    
        
