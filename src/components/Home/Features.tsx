import { Feature, FeatureProps } from '../../types/Features.types';

function FeatureItem({ iconSrc, title, description }: FeatureProps) {
	return (
		<div className="feature-item">
			<img src={iconSrc} alt={`${title} Icon`} className="feature-icon" />
			<h3 className="feature-item-title">{title}</h3>
			<p>{description}</p>
		</div>
	);
}

export default function Features() {
	const features: Feature[] = [
		{
			iconSrc: './img/icon-chat.avif',
			title: 'You are our #1 priority',
			description:
				'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
		},
		{
			iconSrc: './img/icon-money.avif',
			title: 'More savings means higher rates',
			description:
				'The more you save with us, the higher your interest rate will be!',
		},
		{
			iconSrc: './img/icon-security.avif',
			title: 'Security you can trust',
			description:
				'We use top of the line encryption to make sure your data and money is always safe.',
		},
	];

	return (
		<div>
			<section className="features">
				<h2 className="sr-only">Features</h2>
				{features.map((feature, index) => (
					<FeatureItem key={index} {...feature} />
				))}
			</section>
		</div>
	);
}
