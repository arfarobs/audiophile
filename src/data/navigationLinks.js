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
	},
	{
		title: 'Speakers',
		to: 'category/speakers',
		thumbnail: speakersThumbnail,
	},
	{
		title: 'Earphones',
		to: 'category/earphones',
		thumbnail: earphonesThumbnail,
	},
];

export default navigationLinks;