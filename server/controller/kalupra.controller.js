import Complaint from "../modles/contact.model";


const Addcomplaint=async(req,res)=>{
     try {
    
    const {name,email,phone,subject, msg}= await request.json();
    if (!name || !email || !phone || !subject || !msg) {
       return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 })
    }
    const newComplaint = await Complaint.create({ name,email,phone,subject, msg });
    return new Response(JSON.stringify(newComplaint), { status: 201 })
   } catch (error) {
     console.error(error);
     return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    
   }
}

const Getcomplaint=async(req,res)=>{
     try {
        const complaints = await Complaint.find();
        return new Response(JSON.stringify(complaints), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    }
}

const Deletecomplaint=async(req,res)=>{
     try {
   

    const { id } = await request.json();
    console.log("id:",id)
    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), { status: 400 });
    }

    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    console.log("Deleted complaint:", deletedComplaint); // Debugging line

    if (!deletedComplaint) {
      return new Response(JSON.stringify({ message: "Complaint not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Complaint deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

export {Addcomplaint,Getcomplaint,Deletecomplaint};