import KakaoMap from "./KakaoMap";
import { useTranslation } from 'react-i18next';

const Portfolio = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-black pt-20 text-white">
      <h2>{t('portfolio.title')}</h2>
      <KakaoMap />
    </div>
  );
};

export default Portfolio;
