const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    // console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    if (eId===null) {
        // if no such data exists of the user then we push the data into the cloud
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
          
            res.status(401).send(error.message)

        }
    }

    else {
        // otherwise we find the old data and then we add the new details into the array by using push function
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            // console.log(error.message)
            res.status(400).send( error.message)
        }
    }
})
router.post('/myOrderData',async(req,res)=>{
    try{
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData: myData})
    }
    catch(error){
        res.status(400).send(error.message)
    }
})
module.exports = router