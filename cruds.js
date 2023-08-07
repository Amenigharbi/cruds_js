//bich na3mlou machrou3 cruds ili howa fih kol chy w najmou ni5dmou bih ay projet fi ay charika
//crud il c i5tisar l create w r i5tisar il read lil data w u hiya update lil data w d hiya delete
//cruds twali fama s w hiya search
//get total function
//create product
//save lil bayanet fil local storage
//clear inputs
//read data
//count
//delete
//update
//search
//clean data
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit')
let mood='create';
let tmp;
console.log(title,price,taxes,ads,discount,total,count,category,submit);

function getTotal()
{
    if(price.value !=''){
       let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
       total.innerHTML=result //il + t7awel il chaine il nombre
       total.style.background='#040';
        
    }else
    {
        total.innerHTML='';
        total.style.background='#a00d02';
    }
}

let DataPro;
if(localStorage.product != null){
    DataPro=JSON.parse(localStorage.product)
}
else
{
    DataPro=[]
}
submit.onclick=function(){
   
     let newPro={
         title:title.value.toLowerCase(),
         price:price.value.toLowerCase(),
         taxes:taxes.value,
         ads:ads.value,
         discount:discount.value,
         total:total.innerHTML,
         count:count.value,
         category:category.value,
     }
     //save local storage
    if(title.value!='' && price.value!=''  && category.value!='' && newPro.count<100)
    {
    if(mood=='create')
    {
    if(newPro.count>1){
    for(let i=0;i<newPro.count;i++)
    
       DataPro.push(newPro)
    }
    else
    {
        DataPro.push(newPro)
    }
    }
    else
    {

        DataPro[tmp]=newPro
        mood='create'
        submit.innerHTML='create';
        count.style.display='block'
    }

     localStorage.setItem('product',JSON.stringify(DataPro))
     clearData()
     showData()
    }
    
}
showData()
function clearData(){
   title.value=''
   price.value=''
   taxes.value=''
   ads.value=''
   discount.value=''
   total.innerHTML=''
   count.value=''
   category.value=''
}
//read data

function showData()
{
    getTotal()
  let table='';
  for (let i=0;i<DataPro.length;i++)
  {
     table +=`<tr>
     <td>${i+1}</td>
     <td>${DataPro[i].title}</td>
     <td>${DataPro[i].price}</td>
     <td>${DataPro[i].taxes}</td>
     <td>${DataPro[i].ads}</td>
     <td>${DataPro[i].discount}</td>
     <td>${DataPro[i].total}</td>
     <td>${DataPro[i].category}</td>
     <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="DeleteData(${i})"id="delete">delete</button></td>
      </tr>`
  }
   document.getElementById('tbody').innerHTML=table;
   let btnDelete= document.getElementById('deleteAll');
   if(DataPro.length>0)
   {
      btnDelete.innerHTML=`
      <button onclick="Deleteall()">delete all(${DataPro.length})</button>
      `
   }else{
    btnDelete.innerHTML=''   }
    
}

function DeleteData (i){
    DataPro.splice(i,1);
    localStorage.product=JSON.stringify(DataPro);
    showData()


}

function Deleteall()
{
  localStorage.clear()
  DataPro.splice(0)
  showData()

}

function updateData(i)
{
  title.value=DataPro[i].title
  price.value=DataPro[i].price
  taxes.value=DataPro[i].taxes
  ads.value=DataPro[i].ads
  discount.value=DataPro[i].discount
  category.value=DataPro[i].category
  getTotal()
  count.style.display='none';
  submit.innerHTML='Update';
  mood='update'
  tmp=i;
  scroll(
    {
        top:0,
        behavior:'smooth'
    }
  )


}

let searchMood='title';
function getSearchMood(id)
{
 let se=document.getElementById('search')
  
  if(id =='searchTitle')
  {
    searchMood='title'
    
  }
  else{
    searchMood='category'

  }
  se.placeholder='search by '+searchMood;
  se.focus()
  se.value=''
  showData()

}


function SearchData(value)
{

    let table=''
    for(let i=0;i<DataPro.length;i++)
      if(searchMood=='title')
    {
           if(DataPro[i].title.includes(value.toLowerCase()))
           {
            table +=`<tr>
            <td>${i}</td>
            <td>${DataPro[i].title}</td>
            <td>${DataPro[i].price}</td>
            <td>${DataPro[i].taxes}</td>
            <td>${DataPro[i].ads}</td>
            <td>${DataPro[i].discount}</td>
            <td>${DataPro[i].total}</td>
            <td>${DataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
             <td><button onclick="DeleteData(${i})"id="delete">delete</button></td>
             </tr>`
           }


      }
       else{
           if(DataPro[i].category.includes(value.toLowerCase()))
           {
            table +=`<tr>
            <td>${i}</td>
            <td>${DataPro[i].title}</td>
            <td>${DataPro[i].price}</td>
            <td>${DataPro[i].taxes}</td>
            <td>${DataPro[i].ads}</td>
            <td>${DataPro[i].discount}</td>
            <td>${DataPro[i].total}</td>
            <td>${DataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
             <td><button onclick="DeleteData(${i})"id="delete">delete</button></td>
             </tr>`
           }

       }


  document.getElementById('tbody').innerHTML=table;

}



