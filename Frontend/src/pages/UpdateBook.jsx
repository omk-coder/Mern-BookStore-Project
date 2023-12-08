import { useState, useEffect } from "react"
import BackButton from "../components/BackoffButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "notistack"

const UpdateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("")
  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();
  //inorder to get the previous book detail we required useEffect cuz its an different api we dealing with.
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:4000/books/${id}`)
    .then ((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear);
      setLoading(false);
      
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
      alert(error.message);
    })
  }, [])



  const EditSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    }
    setLoading(true);
    //may wonder y we use post request when client send data newly create data to the database we use post request 
    axios.put(`http://localhost:4000/books/${id}`, data) // here we send our create book data to the database
    .then(() =>{
      setLoading(false);
      navigate('/');
      enqueueSnackbar('Book edited Successfully', {variant: "success"});
    })  
    .catch((err) =>{
      setLoading(false);
      console.log(err);
      alert('an error occurred')
      enqueueSnackbar('Error', {variant: "Error"});
    })
  }

 

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
        <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>URL</label>
          <input
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={EditSaveBook}>
          Save
        </button>
      </div>
    </div>
  );

}

export default UpdateBook