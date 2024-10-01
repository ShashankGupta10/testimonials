import { peopleIcons } from '@/constants/hero'
import Image from 'next/image'
import LinkButton from '../common/LinkButton'

export default function Hero() {
  return (
    <div className="relative bg-gray-50 w-screen h-full justify-center items-center">
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0">
        <Image
          className="w-auto h-full"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt=""
          width={500}
          height={500}
        />
      </div>
      <section className="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
            <div className="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
              <div className="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
                  Get meaningful feedbacks on your Product
                </h1>

                <div className="mt-8 lg:mt-12 lg:flex lg:items-center">
                  <div className="flex justify-center flex-shrink-0 -space-x-4 overflow-hidden lg:justify-start">
                    {peopleIcons.map((icon, idx) => (
                      <Image
                        key={idx}
                        className="inline-block rounded-full w-14 h-14 ring-2 ring-white"
                        src={icon}
                        alt=""
                        width={56}
                        height={56}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-lg text-gray-900 lg:mt-0 lg:ml-4 font-pj">
                    Join with{' '}
                    <span className="font-bold">4600+ Companies</span> and
                    start getting feedbacks right now
                  </p>
                </div>
              </div>

              <div className="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                <LinkButton href='/login' size={'xl'}>Get started!</LinkButton>
              </div>
            </div>

            <div className="xl:col-span-3">
              <Image
                className="block mx-auto lg:ml-auto lg:mx-0 scale-110"
                src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffeatures%2Fmore-social-proof.png?alt=media&token=83a1a3e9-449d-457d-80fb-0cfa55484700"
                alt=""
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
