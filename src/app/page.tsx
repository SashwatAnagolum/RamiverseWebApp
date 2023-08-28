import Button from '@/components/Button/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-center bg-bottom bg-cover bg-[url('./../assets/minecraft_world_6_flipped.jpg')] h-screen max-w-screen p-0 overflow-hidden">
      <div className="flex flex-col md:pl-12 pt-24 md:items-start items-center">
        <h1 className="md:pt-8 font-bold xl:text-8xl md:text-7xl sm:text-5xl text-4xl text-white max-w-fit">The Ramiverse</h1>
        <div className="mt-2">
          <Link href={'./publicworlds'}>
            <Button text="Explore Now" theme="blue" type="redirect" clickHandler={null}></Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
