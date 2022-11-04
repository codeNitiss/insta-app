import {navbar} from "./components/navbar.js";

let navbar_div=document.getElementById("navbar");

navbar_div.innerHTML=navbar();


//d1bacc9c29900445846a65a6a75db778

let create_button=document.getElementById("create_btn");

create_button.onclick=()=>{
    createpost();
}


let inp_image=document.getElementById("image");

inp_image.onchange=()=>{

    handleImage();
}

let delete_btn=document.getElementById("delete_btn");
delete_btn.onclick=()=>{
    deletePost();
}
let update_btn=document.getElementById("update_btn");
update_btn.onclick=()=>{
    updatepost();
}

let image_url;


const handleImage=async ()=>{

    let img=document.getElementById("image");
    let actual_img=img.files[0];
    //console.log("actual_img:",actual_img);

    let form=new FormData();
    form.append("image",actual_img);

    let response=await fetch(`https://api.imgbb.com/1/upload?key=d1bacc9c29900445846a65a6a75db778`,{
        method:'POST',
        body: form,
    });

    let data=await response.json();
    //console.log("data",data);
    image_url=data.data.display_url;
    console.log("image-url",image_url);
    
}




const createpost=async()=>{

    let id=document.getElementById("id").value;
    let caption=document.getElementById("caption").value;
    let send_data={
        id,
        caption,
        image_url,
    };

    let response=await fetch(`http://localhost:3000/posts`,{
        method:'POST',
        body: JSON.stringify(send_data),
            headers:{
                'Content-Type':'application/json',
            },
        
    });
    let data=await response.json();
    console.log("data",data);
}

const deletePost=async()=>{
    
    let delete_id=document.getElementById("delete_id").value;
    
    let res=await fetch(`http://localhost:3000/posts/${delete_id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
        },
    });
    let data=await res.json();
    console.log("data",data)


}

const updatepost=async()=>{

    try{

    let update_id=document.getElementById("update_id").value;
    let new_caption=document.getElementById("update_caption").value;

    let send_data={
        caption:new_caption,
    };

    let res=await fetch(`http://localhost:3000/posts/${update_id}`,{
        method:'PATCH',

        body: JSON.stringify(send_data),
        headers:{
            'Content-Type':'application/json',
        },

    });
    let data=await res.json();
    console.log("data",data);
   }
   catch(err){
    console.log("err",err);
   }
}




