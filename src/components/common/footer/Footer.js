import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// CSS
import styles from './Footer.module.css';

// Images
import facebookIcon from '../../../assets/images/shared/desktop/icon-facebook.svg';
import twitterIcon from '../../../assets/images/shared/desktop/icon-twitter.svg';
import instagramIcon from '../../../assets/images/shared/desktop/icon-instagram.svg';

//Components
import Navigation from '../navigation/Navigation';

const Footer = ({links}) => {
	const homeLink = links[0];
	const mediaIcons = [
		{
			title: 'Facebook',
			icon: facebookIcon,
		},
		{
			title: 'Twitter',
			icon: twitterIcon
		},
		{
			title: 'Instagram',
			icon: instagramIcon
		}
	];
	
	return (
		<footer className={styles.footer}>
			<div className={styles.orangeLine}></div>
			<div className={styles.navContainer}>
				<NavLink className={styles.logo} to={homeLink.to}>
					<img src={homeLink.image} width="143" height="25" alt="Audiophile" title={homeLink.title} />
				</NavLink>

				<Navigation where='footer' links={links} />
			</div>
			<p className={classNames(styles.p, styles.about)}>
				Audiophile is an all in one stop to fulfill your audio needs. We&apos;re a small team of music lovers 
				and sound specialists who are devoted to helping you get the most out of personal audio. Come and 
				visit our demo facility - we’re open 7 days a week.
			</p>
			<div className={styles.bottomContainer}>
				<p className={classNames(styles.p, styles.copyright)}>Copyright 2021. All Rights Reserved</p>
				<ul className={styles.iconList}>
					{mediaIcons.map(icon => (
						<li className={styles.icon} key={icon.title}>
							<a href="https://github.com/arfarobs" target="_blank" rel="noreferrer">
								<img src={icon.icon} width="24" height="24" alt={icon.title} title={icon.title} />
							</a>
						</li>
					))}
				</ul>
			</div>
		</footer>
	);
};

Footer.propTypes = {
	links: PropTypes.array.isRequired
};

export default Footer;