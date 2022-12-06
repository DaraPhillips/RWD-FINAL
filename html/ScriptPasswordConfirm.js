const show_passw_btn = document.querySelector('#show-passwrd')
const show_passw_icon = show_passw_btn.querySelector('img')
const passw_input = document.querySelector('#verify')

show_passw_btn.addEventListener('click', () => {
	passw_input.type = passw_input.type === 'password' 
		? 'text' 
		: 'password'

	show_passw_icon.src = show_passw_icon.src.includes('Open') 
		? '../images/eyeClosed.svg' 
		: '../images/eyeOpen.svg'
})