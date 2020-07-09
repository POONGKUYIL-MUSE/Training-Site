// Require all packages
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "trainingsite"
})

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(
	bodyParser.urlencoded({extended : false})
)

app.use((req, res, next)=>{
	/*res.header("content-type", "application/json");*/
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
})

const server = app.listen(3000, ()=>{
	console.log("Running Server ............... @localhost:3000");
})

app.post("/login", (req, res)=>{
	console.log(JSON.stringify(req.body));
	console.log(req.body.email);
	var email = req.body.email;
	var password = req.body.password;

	//const logsql = "SELECT * FROM userdetails WHERE email = ? and password = ?";
	const logsql = "SELECT * FROM userdetails WHERE email=? and password=?";
	//const logsql = "SELECT email FROM userdetails";

	conn.query(logsql, [email, password], (err, result, rows, fields)=>{
		if(err) throw err;
		console.log(result);
		/*res.redirect("http://localhost:4200/superadmin");*/
		res.end(JSON.stringify(result));
	});
})	

app.post("/register", (req, res)=>{
	console.log(JSON.stringify(req.body));
	console.log(req.body.name);
	var name = req.body.name;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var password = req.body.password;
	var cfpassword = req.body.cfpassword;
	var userrole = "customer";
	var addedby = "self";

	const regsql = "INSERT INTO userdetails (name, email, mobile, password, cfpassword, registered_at, user_role, added_by) VALUES ?";
	const regval = [
		[name, email, mobile, password, cfpassword, "NOW()", userrole, addedby]
	];

	conn.query(regsql, [regval], (err, result,)=>{
		if(err) throw err;
		console.log(result);
	});

})

app.post("/addAdmin", (req, res)=>{
	console.log(JSON.stringify(req.body));
	console.log(req.body.name);
	var name = req.body.name;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var password = req.body.password;
	var cfpassword = req.body.cfpassword;
	var addedBy = req.body.addedBy;
	var userrole = "admin";

	const regsql = "INSERT INTO userdetails (name, email, mobile, password, cfpassword, registered_at, user_role, added_by) VALUES ?";
	const regval = [
		[name, email, mobile, password, cfpassword, "NOW()", userrole, addedBy]
	];

	conn.query(regsql, [regval], (err, result,)=>{
		if(err) throw err;
		console.log(result);
	});

})

app.get("/getAdmins", (req, res)=>{
	conn.query("SELECT * FROM userdetails WHERE user_role='admin'", (err, result, fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
})

app.post("/addCustomer", (req, res)=>{
	console.log(JSON.stringify(req.body));
	console.log(req.body.name);
	var name = req.body.name;
	var email = req.body.email;
	var mobile = req.body.mobile;
	var password = req.body.password;
	var cfpassword = req.body.cfpassword;
	var addedBy = req.body.addedBy;
	var userrole = "customer";

	const regsql = "INSERT INTO userdetails (name, email, mobile, password, cfpassword, registered_at, user_role, added_by) VALUES ?";
	const regval = [
		[name, email, mobile, password, cfpassword, "NOW()", userrole, addedBy]
	];

	conn.query(regsql, [regval], (err, result)=>{
		if(err) throw err;
		console.log(result);
		//res.redirect("/addCustomer");
	});

})

app.post("/addProduct", (req, res)=>{
	console.log(req.body);
	var name = req.body.name;
	var amount = req.body.amount;
	var description = req.body.description;
	var added_by = req.body.added_by;

	const regprodsql = "INSERT INTO productdetails (name, amount, description, added_by, added_on) VALUES ?"
	const regprodval = [
		[name, amount, description, added_by, "NOW()"]
	];
	conn.query(regprodsql, [regprodval], (err, result)=>{
		if(err) throw err;
		console.log(result);
	});
});	

app.get("/getProducts", (req, res)=>{
	conn.query("SELECT * FROM productdetails", (err, result, fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
})

app.put("/editProduct/:myid", (req, res)=>{
	console.log(JSON.stringify(req.body));
	var ename = req.body.ename;
	var eamount = req.body.eamount;
	var edescription = req.body.edescription;
	var myid = req.params.myid;

	console.log(myid + "Edited Product");

	const edtprodsql = "UPDATE productdetails SET name=?, amount=?, description=? WHERE id=?";
	conn.query(edtprodsql, [ename, eamount, edescription, myid], (err, result, fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
});

app.put("/addCart/:cemail", (req, res)=>{
	console.log(JSON.stringify(req.body));
	var added_by = req.params.cemail;
	var prod_id = req.body.id;
	var prod_name = req.body.name;
	var prod_amount = req.body.amount;
	var prod_quan = 1;
	var prod_totamount = req.body.amount;

	const addcartsql = "INSERT INTO cartdetails(added_by, product_id, product_name, product_amount, product_quantity, product_totalamount) VALUES ?";
	const addcartval = [
		[added_by, prod_id, prod_name, prod_amount, prod_quan, prod_totamount]
	];
	conn.query(addcartsql, [addcartval], (err, result, fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
});

app.post("/addOrder", (req, res)=>{
	console.log(JSON.stringify(req.body));
	var username = req.body.username;
	var useremail = req.body.useremail;
	var product_names = req.body.product_names;
	var product_quantities = req.body.product_quantities;
	var product_amounts = req.body.product_amounts;
	var order_totalamount = req.body.order_totalamount;

	const addordsql = "INSERT INTO placedorderdetails(username, useremail, product_name, product_quantities, product_amounts, order_totalamount) VALUES ?";
	const addordval = [
		[username, useremail, product_names, product_quantities, product_amounts, order_totalamount]
	];
	conn.query(addordsql, [addordval], (err, result, fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});

});

app.get("/getmycart/:cemail", (req,res)=>{
	console.log(JSON.stringify(req.body));
	var cart_owner = req.params.cemail;
	const getcartsql = "SELECT * FROM cartdetails WHERE added_by=?";
	conn.query(getcartsql, [cart_owner], (err, result, fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
});

app.get("/getOrders/:cemail", (req, res)=>{
	console.log(req.body);
	var user = req.params.cemail
	const getordsql = "SELECT * FROM placedorderdetails WHERE useremail = ?";
	conn.query(getordsql, [user], (err, result)=>{
		if(err) throw err;
		console.log(result);
		res.end(JSON.stringify(result));
	});
});

app.get("/getPlacedOrders", (req, res)=>{
	const gettotordsql = "SELECT * FROM placedorderdetails";
	conn.query(gettotordsql, (err, result)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
});

app.put("/editUser/:myid", (req, res)=>{
	console.log(JSON.stringify(req.body));
	var ename = req.body.ename;
	var eemail = req.body.eemail;
	var emobile = req.body.emobile;
	var myid = req.params.myid;
	var user_role = req.body.user_role;
	console.log(myid + "Edited Customer");
	console.log(req.body.user_role);

	const edtsql = "UPDATE userdetails SET name=?, email=?, mobile=? WHERE id=? and user_role=?";
	conn.query(edtsql, [ename, eemail, emobile, myid, user_role], (err, result, fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
});

app.delete("/delUser/:myid", (req, res)=>{
	var myid = req.params.myid;
	console.log(myid + "Deleted");

	const delsql = "DELETE FROM userdetails WHERE id=?";
	conn.query(delsql, [myid], (err, result,fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
});

app.delete("/updcart/:cemail", (req,res)=>{
	console.log("update cart");
	console.log(JSON.stringify(req.body));
	console.log(req.body);
	console.log(req.body[0]);

});

app.delete("/delProduct/:myid", (req, res)=>{
	var myid = req.params.myid;
	console.log(myid + "Deleted");

	const delprodsql = "DELETE FROM productdetails WHERE id=?";
	conn.query(delprodsql, [myid], (err, result, fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
});

app.get("/getCustomers", (req, res)=>{
	conn.query("SELECT * FROM userdetails WHERE user_role='customer'", (err, result, fields)=>{
		if(err) throw err;
		res.end(JSON.stringify(result));
	});
})