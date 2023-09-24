import headphonesThumbnail from '../assets/images/shared/desktop/image-category-thumbnail-headphones.webp';
import speakersThumbnail from '../assets/images/shared/desktop/image-category-thumbnail-speakers.webp';
import earphonesThumbnail from '../assets/images/shared/desktop/image-category-thumbnail-earphones.webp';
import audiophileLogo from '../assets/images/shared/desktop/logo.svg';

const navigationLinks = [
	{
		title: 'Home',
		to: '/',
		image: audiophileLogo
	},
	{
		title: 'Headphones',
		to: 'category/headphones',
		thumbnail: headphonesThumbnail,
		width: 438,
		height: 422
	},
	{
		title: 'Speakers',
		to: 'category/speakers',
		thumbnail: speakersThumbnail,
		width: 438,
		height: 408
	},
	{
		title: 'Earphones',
		to: 'category/earphones',
		thumbnail: earphonesThumbnail,
		width: 438,
		height: 380
	},
];

export default navigationLinks;