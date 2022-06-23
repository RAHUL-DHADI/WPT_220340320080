const express = require('express');
const app = express();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'nodejs',
	port:3306
});



app.use(express.static('abc'));



app.get('/finddetails',(req,res)=>{

    let input=req.query.bookid;

    let output={status:false,bookdetails:{}};

    var result ="";
connection.query("select * from book where bookid= ?", [input], (err,rows) => {
        if (err) {
            result = err;
			console.log("trouble " + err);
        } else {
            if(rows.length>0){
                console.log('rows found');
             output.status=true;
             output.bookdetails=rows[0];   
            
			console.log("success")
        }
            else{
            console.log('book not present')
            }

            res.send(output);


        }



		
	
        
    });
    
	
   

 

    });



    app.get('/update',(req,res)=>{


        let bookid=req.query.bookid;
        let price =req.query.price;


        output={status:false , message:'not successful'};

        connection.query('update book set price = ? where bookid = ?', [price,bookid], (err, res1) => {
            if (err) {
                result = err;
            }else {
                if(res1.affectedRows==0){
                 console.log('no update');
                }
 
                else{
                 output.status=true;
                 console.log('rows found');
                 console.log('updated')
                }

                res.send(result);
                 
             }

        })
        

        



    });


    


app.listen(8081, function () {
    console.log("server listening at port 8081...");
});