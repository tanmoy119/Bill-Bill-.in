import tw from "twin.macro";
import Navbar from "../components/Navbar";
import { useTypewriter} from 'react-simple-typewriter';

export default function Home() {

  const {text} = useTypewriter({
    words: [ " EASY...."," Digital....."," Paper Free..."," Self Dependent .",],
    loop: 0,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000
    })
  return (<>
  <Cointainer style={{backgroundImage: "url('img/img1.jpg')"}}>
    <Navbar/>
    <div className="md:backdrop-blur-sm w-full h-[873px] clip-your-needful-styles mt-[64px] ">
    </div>
    <h1 className="absolute top-[50%] left-[30%] text-white text-4xl  " ><span>Make Your buisness </span><span className="text-[#86efac]">
          {text}
        </span><span>|</span></h1>

       
    </Cointainer>
    </>
  )
}


const Cointainer = tw.div`
text-blue-900
h-screen
w-screen
absolute
bg-no-repeat
bg-center

`