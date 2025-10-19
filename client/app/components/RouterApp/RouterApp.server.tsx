import * as React from 'react'
import type { FunctionComponent } from 'react'
import { StaticRouter, Routes, Route, Link } from 'react-router-dom'
import HelloWorld from '@components/HelloWorld/HelloWorld'
import * as styles from '@styles/application.module.css'

export interface Props {
  readonly name: string
}

// Define railsContext type based on React on Rails documentation
interface RailsContext {
  readonly location?: string
  readonly pathname?: string
  readonly [key: string]: any
}

// Home page component
const Home: FunctionComponent<Props> = ({ name }) => {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }} className={styles.bright}>
          Home
        </Link>
        <Link
          to="/about"
          style={{ marginRight: '10px' }}
          className={styles.bright}
        >
          About
        </Link>
        <Link to="/contact" className={styles.bright}>
          Contact
        </Link>
      </nav>
      <HelloWorld name={name} />
    </div>
  )
}

// About page component
const About: FunctionComponent = () => {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }} className={styles.bright}>
          Home
        </Link>
        <Link
          to="/about"
          style={{ marginRight: '10px' }}
          className={styles.bright}
        >
          About
        </Link>
        <Link to="/contact" className={styles.bright}>
          Contact
        </Link>
      </nav>
      <h1 className={styles.bright}>About Page</h1>
      <p className={styles.bright}>
        This is a demo of React Router with server-side rendering using React on
        Rails.
      </p>
      <p className={styles.bright}>
        Built with React {React.version} and React Router v7.
      </p>
    </div>
  )
}

// Contact page component
const Contact: FunctionComponent = () => {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }} className={styles.bright}>
          Home
        </Link>
        <Link
          to="/about"
          style={{ marginRight: '10px' }}
          className={styles.bright}
        >
          About
        </Link>
        <Link to="/contact" className={styles.bright}>
          Contact
        </Link>
      </nav>
      <h1 className={styles.bright}>Contact Page</h1>
      <p className={styles.bright}>Get in touch with us!</p>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <label className={styles.bright} htmlFor="email">
            Email:{' '}
            <input id="email" type="email" placeholder="your@email.com" />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label className={styles.bright} htmlFor="message">
            Message:{' '}
            <textarea id="message" rows={4} placeholder="Your message..." />
          </label>
        </div>
        <button type="submit" className={styles.bright}>
          Send
        </button>
      </form>
    </div>
  )
}

// Server-side router app using StaticRouter
// React on Rails requires returning a Function Component, not JSX directly
const RouterApp = (props: Props, railsContext: RailsContext) => {
  // Get the current location from Rails context
  const location = railsContext.location || '/'

  return () => (
    <StaticRouter location={location}>
      <Routes>
        <Route path="/" element={<Home name={props.name} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </StaticRouter>
  )
}

export default RouterApp
