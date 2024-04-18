'use client'
import React, { useEffect } from 'react';
import { Stage, Layer, Rect, Text, Image, Path } from 'react-konva';
import './App.css';
import { Stage as sref } from 'konva/lib/Stage';
import useImage from 'use-image';
import dayjs from 'dayjs';

function App() {
  const imagecontainerref = React.useRef<HTMLDivElement>(null)
  const [quote, setQuote] = React.useState<string>('Crowd goes wild at her fingertips. Half moonshine, full eclipse')
  const [image, setImage] = React.useState<string>('/img_1.jpeg')
  const ref = React.useRef<sref>(null)
  const [form, setForm] = React.useState({
    name: '',
    blurb: '',
    quote: '',
    instagram: '',
  })
  const images = [
    '/img_1.jpeg',
    '/img_2.jpeg',
    '/img_3.jpeg',
    '/img_4.jpeg'
  ]



  const colours = [
    '#A99F90',
    '#7C7B78',
    '#24221C',
    '#EEEDEA'
  ]

  const textcolors = [
    '#121212',
    '#121212',
    '#A99F90',
    '#121212'
  ]

  const quotes = [
    'Crowd goes wild at her fingertips. Half moonshine, full eclipse',
    "I wish I could un-recall how we almost had it all.",

    "Even statues crumble, if they’re made to wait.",

    "One less temptress. One less dagger to sharpen",

    "I love you, it’s ruining my life",

    "You don’t get to tell me about sad",

    "Old habits die screaming",

    "Am I allowed to cry?",

    "All’s fair in love in poetry",

    "Lost the game of chance. What are the chances?"
  ]

  const Getimage = () => {
    console.log(useImage)
    const [img] = useImage(image)
    return img
  }

  const setforminput = (field: string, value: string) => {
    setForm({ ...form, [field]: value })
  }


  const [wh, setWh] = React.useState({ width: 0, height: 0 })
  const [color, setColor] = React.useState('#A99F90')

  useEffect(() => {
    console.log(imagecontainerref.current?.clientHeight)
    console.log(imagecontainerref.current?.clientWidth)
    setWh({ width: imagecontainerref.current?.clientWidth || 0, height: imagecontainerref.current?.clientHeight || 0 })

    //on resize get the new height and width
    window.addEventListener('resize', () => {
      console.log(imagecontainerref.current?.clientHeight)
      console.log(imagecontainerref.current?.clientWidth)
      setWh({ width: imagecontainerref.current?.clientWidth || 0, height: imagecontainerref.current?.clientHeight || 0 })
    })
  }, [])

  const exportImg = () => {
    const uri = ref.current?.toDataURL({
      pixelRatio: 4,
      quality: 1,
    })
    const a = document.createElement('a')
    a.href = uri || ''
    a.download = 'card.png'
    a.click()
    a.remove()
  }


  return (
    <div className="bg-white h-screen flex flex-col lg:flex-row">
      <div className="flex flex-col justify-center items-center w-full py-20 lg:py-0 lg:w-fit lg:max-w-[26rem] border-r-gray-300 px-10 border-r">
        <div>
          <p className="text-4xl font-bold">Make your own TTPD themed card</p>
          <p className="text-2xl">Fill out the form to create your card</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full lg:w-[32rem] px-10 ml-auto">
        <div className='max-w-full'>
          <p className="text-lg font-bold mt-2 ">Details</p>
          <p className="text-sm font-bold mb-2 mt-4">Your name</p>
          <input type="text" value={form.name} onChange={(e) => setforminput('name', e.target.value)} name="name" className="p-2 w-full border-gray-300 border rounded-xl" required />
          <p className="text-sm font-bold mb-0 mt-4">Your blurb</p>
          <input type="text" value={form.blurb} onChange={(e) => setforminput('blurb', e.target.value)} placeholder="Chairperson of The Tourtured Poets Deparement" name="blurb" className="p-2 w-full border-gray-300 border rounded-xl mt-2" required />
          <p className="text-sm font-bold mb-0 mt-4">Instagram Handle (optional)</p>
          <input type="text" value={form.instagram} onChange={(e) => setforminput('instagram', e.target.value)} placeholder="Instagram Handle" name="instagram" className="p-2 w-full border-gray-300 border rounded-xl mt-2" required />
          <p className="text-sm font-bold mb-0 mt-4">Quote</p>
          <select value={quote} onChange={(e) => setQuote(e.target.value)} className="p-2 w-full border-gray-300 border rounded-xl mt-2">
            {quotes.map((q, index) => (
              <option key={index} value={q}>{q}</option>
            ))}
          </select>


          <p className="text-lg font-bold mt-2 ">Background<span className="text-red-600">*</span></p>
          <div className='grid grid-cols-2 gap-2 w-full'>
            {images.map((i, index) => (
              <button
                key={index}
                data-selected={i === image}
                onClick={() => {
                  setImage(i)
                }}
                className="min-w-6 h-24 overflow-clip bg-white data-[disabled=true]:bg-gray-100 data-[disabled=true]:cursor-default hide-arrows border-gray-300 border rounded-xl flex items-center justify-center data-[selected=true]:border-black transition relative">
                <img key={index} src={i} alt={`TTPD background ${index}`} className="" />
              </button>
            ))}
          </div>
          <p className="text-lg font-bold mt-2 ">Colour<span className="text-red-600">*</span></p>
          <div className='flex gap-x-2 w-full'>
            {colours.map((colour, index) => (
              <button
                data-selected={colour === color}
                onClick={() => {
                  setColor(colour)
                }}
                className="min-w-6 h-14 overflow-clip w-1/2 bg-white data-[disabled=true]:bg-gray-100 data-[disabled=true]:cursor-default hide-arrows border-gray-300 border rounded-xl  flex items-center justify-center data-[selected=true]:border-black transition relative">
                <div key={index} style={{ backgroundColor: colour }} className="w-full h-full rounded-lg"></div>
              </button>
            ))}
          </div>

          <button onClick={exportImg} className="bg-black text-white w-full p-2 mt-4 rounded-xl">Export</button>


          <div className='max-w-full overflow-x-auto rounded-xl overflow-y-clip mb-20'>
            <div className='border mt-2 w-[382px] min-w-[382px] h-[214px] flex border-gray-300 rounded-xl overflow-clip max-w-full' ref={imagecontainerref}>
              <Stage height={214} width={382} ref={ref}>
                <Layer>
                  <Rect fill={color} width={382} height={214} />
                </Layer>
                <Layer>
                  <Image image={Getimage()} scale={{
                    x: 0.12,
                    y: 0.12
                  }} x={0} y={0} cornerRadius={[0, 100, 100, 0]} />
                  <Text x={183} y={20} text={form.name || 'Name'} fontFamily='Libre Caslon Text' fontSize={20} fill={textcolors[colours.indexOf(color)] as string || "#A99F90"} />
                  <Text width={180} x={183} y={45} text={form.blurb || 'Chairperson of The Tourtured Poets Deparement'} fontFamily='Libre Caslon Text' fontSize={10} wrap='word' fill={textcolors[colours.indexOf(color)] as string || "#A99F90"} />
                  {form.instagram && <>
                    <Path x={350} y={quote.length > 40 ? 140 : 150} width={5} fill={textcolors[colours.indexOf(color)] as string || "#A99F90"} height={5} data="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    <Text width={180} align='right' x={163} y={quote.length > 40 ? 143 : 153} text={`@${form.instagram}`} fontFamily='Libre Caslon Text' fontSize={10} wrap='word' fill={textcolors[colours.indexOf(color)] as string || "#A99F90"} />
                  </>}
                  <Text x={10} y={192} text={`Valid from: ${dayjs().format('MM/DD/YYYY')}`} fontFamily='Libre Caslon Text' fontSize={10} fill={textcolors[colours.indexOf(color)] as string || "#A99F90"} />
                  <Text x={10} y={182} text='Offical member of The Tortured Poets Department' fontFamily='Libre Caslon Text' fontSize={6} fill={textcolors[colours.indexOf(color)] as string || "#A99F90"} />
                  <Text x={230} y={quote.length > 40 ? 163 : 173} width={140} align='right' text={quote} fontFamily='Libre Caslon Text' fontSize={8} fill={textcolors[colours.indexOf(color)] as string || "#A99F90"} />
                  <Text x={230} y={186} width={140} align='right' text='Make your own at ttpd.swtnotify.com' fontFamily='Libre Caslon Text' fontSize={8} fill={textcolors[colours.indexOf(color)] as string || "#A99F90"} />
                </Layer>
              </Stage>

            </div>
          </div>
        </div>

      </div>



    </div>
  );
}

export default App;
