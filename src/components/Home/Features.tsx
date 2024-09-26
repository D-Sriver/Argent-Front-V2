import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Feature, FeatureProps } from '../../types/Features.types';

function FeatureItem({ iconSrc, title, description }: FeatureProps) {
	return (
		<div className="feature-item">
			<img src={iconSrc} alt={`${title} Icône`} className="feature-icon" />
			<h3 className="feature-item-title">{title}</h3>
			<p>{description}</p>
		</div>
	);
}

export default function Features() {
	const features = useSelector((state: RootState) => state.features);

	return (
		<div>
			<section className="features">
				<h2 className="sr-only">Fonctionnalités</h2>
				{features.map((feature: Feature, index: number) => (
					<FeatureItem key={index} {...feature} />
				))}
			</section>
		</div>
	);
}
