import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { Link } from 'react-router-dom'

// Styles
import './Signup.scss'
import googleLogo from '../../assets/btn_google_dark_normal_ios.svg'
import githubLogo from '../../assets/GitHub-Mark-Light-32px.png'

export default function Signup() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [thumbnail, setThumbnail] = useState(null)
	const [thumbnailError, setThumbnailError] = useState(null)
	const { signup, signInWithGoogle, signInWithGithub, isPending, error } = useSignup()

	const handleSubmit = e => {
		e.preventDefault()
		signup(email, password, displayName, thumbnail)
	}

	const handleSubmitWithGoogle = e => {
		e.preventDefault()
		signInWithGoogle()
	}

	const handleSubmitWithGithub = e => {
		e.preventDefault()
		signInWithGithub()
	}

	const handleFileChange = e => {
		setThumbnail(null)
		let selected = e.target.files[0]

		if (!selected) {
			setThumbnailError('Please select a file')
			return
		}
		if (!selected.type.includes('image')) {
			setThumbnailError('Selected file must be an image')
			return
		}
		if (!selected.size > 100000) {
			setThumbnailError('Image file size must be less than 100kb')
			return
		}

		setThumbnailError(null)
		setThumbnail(selected)
	}

	return (
		<div className='signup'>
			<div className='auth-decoration'>
				<div className='circle'></div>
				<div className='blur'></div>
			</div>
			<form className='auth-form' onSubmit={handleSubmit}>
				<div className='auth-form__title'>
					<h2>Join us</h2>
				</div>

				<label>
					<span>Email:</span>
					<input type='email' required onChange={e => setEmail(e.target.value)} value={email} placeholder='Aa' />
				</label>
				<label>
					<span>Password:</span>
					<input
						type='password'
						required
						onChange={e => setPassword(e.target.value)}
						value={password}
						placeholder='Aa'
					/>
				</label>
				<label>
					<span>Display name:</span>
					<input
						type='text'
						required
						onChange={e => setDisplayName(e.target.value)}
						value={displayName}
						placeholder='Aa'
					/>
				</label>
				<label>
					<span>Profile thumbnail:</span>
					<input type='file' required onChange={handleFileChange} />

					{thumbnailError && <div className='error'>{thumbnailError}</div>}
				</label>

				{!isPending && <button className='btn'>Sign up</button>}
				{isPending && (
					<button className='btn' disabled>
						Loading
					</button>
				)}

				<div className='others-separator'>
					<span>or</span>
				</div>

				<button className='google-btn' onClick={handleSubmitWithGoogle}>
					<img src={googleLogo} alt='google logo' />
					<span>Sign in with google</span>
				</button>

				<button className='github-btn' onClick={handleSubmitWithGithub}>
					<img src={githubLogo} alt='github logo' />
					<span>Sign in with GitHub</span>
				</button>

				<p className='change-page'>
					Already have an account? <Link to='/login'>Login</Link>
				</p>

				{error && <div className='error'>{error}</div>}
			</form>
		</div>
	)
}
