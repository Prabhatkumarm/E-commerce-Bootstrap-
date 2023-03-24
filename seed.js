const mongoose = require('mongoose');
const Product = require('./models/products');

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
.then(()=>{console.log('DB connected')})
.catch((err)=>{console.log(err)})

const products=[
    {
        name:'Apple',
        img:'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        price: 100,
        description:'An apple a day keeps doctor away'
    },
    {
        name: 'Banana',
        img:'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
        price: 30,
        description: 'Banana is full of carbs'
    },
    {
        name:'Mango',
        img:'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        price: 60,
        description: 'Mango is the king of fruits'
    },
    {
        name: 'Orange',
        img:'https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
        price: 40,
        description: 'Orange is orange in color'
    }
];

Product.insertMany(products)
.then(()=>{
    console.log('Database seeded');
})

