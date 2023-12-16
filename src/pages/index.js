import HomeContent from '@/components/HomeContent'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
        <meta property="url" content="https://jollibee.com.vn/"/>
        <meta name="type" content="website"/>
        <meta name ="title" content="Jollibee Việt Nam"/>
        <meta name="description" content="Tận hưởng những khoảnh khắc trọn vẹn cùng Jollibee." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HomeContent/>
    </>
  )
}
