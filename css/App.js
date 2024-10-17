import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios, { toFormData } from 'axios';

function App() {
  let [user,setUser]=useState([])
  let [userDetails,setuserDetails]=useState({
    uname:'',
    uemail:'',
    uphone:'',
    uPassword:'',

  })

  // let n=[10,20,30,40]
  // let m=[...n];

  // console.log("n",n)
  // console.log("m",m)

  // m.push(60);
  
  // console.log("n",n)
  // console.log("m",m)
 
  let getValue=(event)=>{

    let obj={...userDetails}
    let inputName=event.target.name;  //uname
    let inputValue=event.target.value; //pradeep
    obj[inputName]=inputValue;
    setuserDetails(obj)

    console.log(inputName)

  }


  let handleForm=(event)=>{

    let finalformData={
      name:userDetails.uname,
      email:userDetails.uemail,
      mobile:userDetails.uphone,
      password:userDetails.uPassword
    }
    axios.post(`https://raipradeep.in/form-api/saveUser.php`,toFormData(finalformData))
    .then((res)=>res.data)
    .then((finalRes)=>{
      console.log(finalRes)
      setuserDetails(
        {
          uname:'',
          uemail:'',
          uphone:'',
          uPassword:'',
      
        }
      )
    })

    getAllUser()
    console.log(userDetails)
    event.preventDefault()
  }

  let getAllUser=()=>{
    axios.get('https://raipradeep.in/form-api/viewUser.php')
    .then((res)=>res.data)
    .then((finalRes)=>{
      setUser(finalRes.dataList)
    })
  }

  useEffect(()=>{
    getAllUser();
  },[])

  return (
    <div className='max-w-[1320px] mx-auto bg-[lightblue]s'>
       <div className='grid grid-cols-[30%_auto] gap-[30px] my-[40px]'>
          <div>
            <h2 className='text-[30px] font-bold'>Enquire Now</h2>
          <form onSubmit={handleForm}>
      <div class="grid grid-cols-1 gap-5">
        <input
          type="text"
          class="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
          placeholder="First Name"
          name='uname'
          value={userDetails.uname}

          onChange={getValue}
        />
       
        <input
          type="email"
          class="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 "
          placeholder="Email"
          name='uemail'
          value={userDetails.uemail}
          onChange={getValue}
        />
        <input
          type="tel"
          class="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
          placeholder="Phone"
          name='uphone'
          value={userDetails.uphone}
          onChange={getValue}
        />
        <input
         
          type='password'
        
          class="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
          placeholder="Password..."
          name='uPassword'
          value={userDetails.uPassword}
          onChange={getValue}
          />
      </div>
      <input
        type="submit"
        value="Send Message"
        class="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full"
      />
    </form>
          </div>
          <div>
          <div
        class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
      >
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               ID
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               Name
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
               Phone
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Message
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
            user.length>=1
            ?
              user.map((v,i)=>{
                return(
                  <tr>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                1
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                   {v.en_name}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {v.en_email}
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {v.en_contact}
              </td>
              <td
                class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
              >
                {v.en_password}
               
              </td>
              <td>
              <input
        type="button"
        value="Delete"
        class="focus:outline-none  bg-purple-500 px-4 py-2 text-white font-bold w-full"
      />
              </td>
            </tr>
          
                )
              })
              
              :
              ''
            
            }
            
           
          </tbody>
        </table>
      </div>
          </div>
       </div>
    </div>
  );
}

export default App;
