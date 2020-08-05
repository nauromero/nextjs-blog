import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';

// En get static props defino que data necesito de fuentes externas y hago el fetch
// en este caso importo la funcion getSortedPostData que hace un fetch a data del fs
// esta data la tengo ue retornar dentro de las props

// Solo puede manejar data durante el build time, no puede obtener data durante el request time (query params, http headers, etc)
export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

// luego le paso la data desestructurada como argumento al componente
export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>My goal as a Full Stack Developer is to work as a team to achieve scalable, lightweight, and easily readable applications on Front End and Back End. Currently, I work mainly with Javascript, oriented to the MERN stack (MongoDB, Express, React & Node). </p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href='/posts/[id]' as={`/posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
