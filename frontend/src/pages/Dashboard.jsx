import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PostForm from '../components/PostForm';
import PostItem from '../components/PostItem';
import Header from '../components/Header'
import { getPosts,reset } from '../features/Posts/postSlice';


function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
  console.log("error..")
  }

  return (
    <>


    <Header/>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>PostDashboard</p>
      </section>

      <PostForm />

      <section className='content'>
        {posts.length > 0 ? (
          <div className='goals'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <h3>You have not set any memories</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
