import SideNav from '../components/SideNav'
import Head from 'next/head'
import Link from 'next/link'
import tempe from 'tempe'
import siteData from '../site-data'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt,faFileCode } from '@fortawesome/free-solid-svg-icons'
import Masonry from 'react-masonry-css'

function IndexPage(props){
   const breakpointColumnsObj = {
      default: 1,
      1400: 3,
      700: 2,
      500: 1
   };
   return(
      <>
         <Head>
            <title>Home | {siteData.name}</title>
            <meta name='apple-mobile-web-app-title' content='Armiko' />
            <meta name='description' content='Armiko Personal Website' />
            <meta property='og:title' content='Armiko' />
            <meta property='og:description' content='Armiko personal website' />
            <meta data-hid="og:image" property="og:image" content="/assets/nako.jpg"/>
            <meta property='og:image' content="/assets/nako.jpg" />
         </Head>
         <Navbar />
         <SideNav />
         <div className="relative flex w-full min-h-screen md:w-2/3">
            <main className="flex-1">
               <div className="min-h-screen px-2 py-1 mt-20 md:m-8">
                  <div className='my-4 mt-10 text-2xl font-bold'>Articles</div>
                  <div className="relative">
                     <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                     >

                        {/* get posts data */}
                        {props.posts.map((post)=>{
                           return (
                              <>
                                 <div  key={post.id} className='mt-auto overflow-hidden rounded-lg bg-secondary hover:shadow-xl'>
                                    <div className='p-4'>
                                       <div>
                                          <div className='text-xl font-extrabold'>
                                             <Link href={`/post/${post.slug}`}>
                                                {post.title}
                                             </Link>
                                          </div>
                                          <div className='flex flex-row pt-2 pb-2 mb-2 text-secondary postBorder'>
                                             <span className='text-xs text-secondary'>
                                                <FontAwesomeIcon icon={faCalendarAlt} className='mr-2'/>
                                                {tempe(post.date).format("d, DD MMMM YYYY")}
                                             </span>
                                          </div>
                                          <div className='pb-4 text-secondary'>
                                             {post.desc}
                                          </div>
                                          {post.tags.map(tag=>(
                                             <span key={tag.id} className='px-2 mr-1 text-base text-gray-800 rounded-sm bg-accent'>{tag}</span>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              </>
                           );
                        }).slice(-6)
                        }
                     </Masonry>
                  </div>

                  {/* get project data */}
                  {/* <div className='my-4 mt-12 text-2xl font-bold'>Projects</div> */}
                  {/* <div className="relative"> */}
                  {/*   <Masonry */}
                  {/*     breakpointCols={breakpointColumnsObj} */}
                  {/*     className="my-masonry-grid" */}
                  {/*     columnClassName="my-masonry-grid_column" */}
                  {/*   > */}
                  {/*     {/1* projects data *1/} */}
                  {/*     {props.projects.map((project)=>{ */}
                  {/*       const cover = '/assets/project/' + project.slug + '/cover.png' */}
                  {/*       return ( */}
                  {/*         <> */}
                  {/*           <div  key={project.id} className='overflow-hidden rounded-lg shadow-md bg-secondary hover:shadow-xl'> */}
                  {/*             <img src={cover} width='100%' /> */}
                  {/*             <div className='p-4'> */}
                  {/*               <div> */}
                  {/*                 <div className='text-xl font-extrabold'> */}
                  {/*                   <Link href={`/project/${project.slug}`}> */}
                  {/*                     {project.title} */}
                  {/*                   </Link> */}
                  {/*                 </div> */}
                  {/*                 <div className='flex flex-row pt-2 pb-2 mb-2 text-secondary postBorder'> */}
                  {/*                   <span className='text-xs text-secondary'> */}
                  {/*                     <FontAwesomeIcon icon={faCalendarAlt} className='mr-2'/> */}
                  {/*                     {tempe(project.date).format("d, DD MMMM YYYY")} */}
                  {/*                   </span> */}
                  {/*                 </div> */}
                  {/*                 <div className='pb-4 text-secondary'> */}
                  {/*                   {project.desc} */}
                  {/*                 </div> */}

                  {/*                 <a href={project.source}  className='px-2 pb-1 text-gray-800 rounded-sm bg-accent'> */}
                  {/*                   <FontAwesomeIcon icon={faFileCode} /> Source</a> */}
                  {/*               </div> */}

                  {/*             </div> */}
                  {/*           </div> */}
                  {/*         </> */}
                  {/*       ); */}
                  {/*     }).slice(-3) */}
                  {/*     } */}
                  {/*   </Masonry> */}
                  {/* </div> */}
               </div>
               <Footer />
            </main>
         </div>
      </>
   )
}

export async function getStaticProps() {
   const fs  = require('fs');
   const matter = require('gray-matter');
   const { v4: uuid } = require('uuid');

   // get projects data
   const filesprojects = fs.readdirSync(`${process.cwd()}/projects/`, "utf-8");
   const projects = filesprojects
      .filter((fn) => fn.endsWith(".md"))
      .map((fn) => {
         const path = `${process.cwd()}/projects/${fn}`;
         const rawContent =fs.readFileSync(path, {
            encoding: "utf-8",
         });
         const { data } = matter(rawContent);
         return {...data, id:uuid()};
      });

   // get posts data
   const files = fs.readdirSync(`${process.cwd()}/contents/`, "utf-8");
   const posts = files
      .filter((fn) => fn.endsWith(".md"))
      .map((fn) => {
         const path = `${process.cwd()}/contents/${fn}`;
         const rawContent =fs.readFileSync(path, {
            encoding: "utf-8",
         });
         const { data } = matter(rawContent);
         return {...data, id:uuid()};
      });


   return {
      props : { posts,projects },

   };


}





export default IndexPage
