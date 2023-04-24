export const sortGalleryArray = (gallery) => {
	const galleryArray = Object.entries(gallery).map(([key, value]) => ({ key, ...value }));

	return galleryArray.sort((a, b) => {
		if (a.key < b.key) return -1;
		if (a.key > b.key) return 1;
		return 0;
	});
};