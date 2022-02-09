import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';

const Home: NextPage = ( data ) => {

  function handleTranslateButton() {
    console.log('translate');
  }

  function handleListenButton() {
    console.log('listen button clicked');
  }

  function handleDownloadButton() {
    console.log('download button clicked');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-slate-100">
      <Head>
        <title>Voice Over Generator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container max-w-4xl bg-white border-2 border-slate-300 shadow-lg mb-5">
        <div className="container p-5 bg-slate-50">
          <h1 className="text-xl font-medium">
            Translator
          </h1>
        </div>
        <div className="container p-5">
          <div>
            <div className="mb-2">Source language</div>
            <select
              className="w-full p-1 mb-2 border-2 border-slate-400"
              onChange={e => {
                console.log(e.target.value);
              }}
            >
              {data.translateSourceLanguages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
            <textarea
              className="w-full p-3 border-2 border-slate-400"
              rows={4}
              defaultValue="it is english"
            />
          </div>
        </div>
        <div className="flex justify-end px-5 pb-5">
          <button onClick={handleTranslateButton} className="py-2 px-5 mr-3 border-2 border-slate-400">Translate</button>
        </div>
      </div>

      <div className="container max-w-4xl bg-white border-2 border-slate-300 shadow-lg">
        <div className="container p-5 bg-slate-50">
          <h1 className="text-xl font-medium">
            Voice Maker
          </h1>
        </div>
        <div className="container p-5">
          <div>
            <div className="mb-2">Speech language</div>
            <select
              className="w-full p-1 mb-2 border-2 border-slate-400"
              onChange={e => {
                console.log(e.target.value);
              }}
            >
              {data.speechLanguages.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
            <textarea
              className="w-full p-3 border-2 border-slate-400"
              rows={4}
              defaultValue="it is source language"
            />
          </div>
        </div>
        <div className="flex justify-end px-5 pb-5">
          <button onClick={handleListenButton} className="py-2 px-5 mr-3 border-2 border-slate-400">Download</button>
          <button onClick={handleDownloadButton} className="py-2 px-5 bg-orange-500 text-white">Listen</button>
        </div>
      </div>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Created by Andy Primawan
      </footer>
    </div>
  )
}

export async function getServerSideProps() {

  const translateSourceLanguages = await (await axios.get('http://localhost:4000/translates/source-languages')).data;
  const speechLanguages = await (await axios.get('http://localhost:4000/speeches/speech-languages')).data;
  const translateToPollyMap = await (await axios.get('http://localhost:4000/translates/translate-to-polly-map')).data;

  return {
    props: {
      translateSourceLanguages,
      speechLanguages,
      translateToPollyMap
    }
  }
}

export default Home
