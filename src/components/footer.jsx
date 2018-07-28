import '../assets/style/footer.styl'

export default {
	data() {
		return {
			author: 'Peaunt_JY'
		}
	},
	render() {
		return (
			<div id="footer">
				<span>Written by {this.author}</span>
				<br/>
                <span>Hosted by Coding Pages</span>
			</div>
		)
	}
}