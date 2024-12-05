import home1 from '../assets/home.jpg'
import style from './styles/home.module.css'
const Home = () => {
  return (
    <div className={style.container}>
     <div className={style.wallpaper}>
     <img src={home1} alt="Colleagues working" />
     </div>
      <div className={style.text}>
      <h1 style={{textAlign:'center'}}>Welcome to VMS</h1>
      <p>Place for seamless execution of workflow</p>
      </div>
    </div>
  )
}

export default Home
