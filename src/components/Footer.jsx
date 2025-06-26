import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = ({ lang }) => {
  const { t } = useTranslation();
  const footerItems = t('footer.links', { returnObjects: true });

  // 번역 파일의 item.id에 따라 올바른 경로를 생성하는 헬퍼 함수
  const getPathForItem = (item) => {
    switch(item.id) {
      case 'privacyPolicy':
        return `/${lang}/legal#privacy`; // #privacy 해시 추가
      case 'noEmail':
        return `/${lang}/legal#noemail`; // #noemail 해시 추가
      case 'contact':
        return `/${lang}/contact`;
      default:
        return `/${lang}`; // 기본 경로
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-12">
          {/* 왼쪽 컬럼 - 회사 정보 */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-sm md:text-base mb-1 rounded-md">
              &copy; {t('footer.companyNameShort')}
            </p>
            <p className="text-xs md:text-sm mb-1 rounded-md">
              <span className="font-semibold">{t('footer.businessNumber')}</span> | 214-87-43822
            </p>
            <p className="text-xs md:text-sm mb-1 rounded-md">
              <span className="font-semibold">{t('footer.owner')}</span> | {t('footer.ownerName')}
            </p>
            <p className="text-xs md:text-sm mb-1 rounded-md">
              {t('footer.addressDetail')}
            </p>
          </div>

          {/* 오른쪽 컬럼 - 링크 */}
          <div className="w-full md:w-1/2 text-center md:text-right">
            <ul className="space-y-2">
              {footerItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={getPathForItem(item)} // 헬퍼 함수를 사용하여 경로 설정
                    className="hover:text-white transition-colors duration-200 text-sm md:text-base rounded-md"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 저작권 정보 */}
        <div className="mt-8 pt-6 text-center text-xs md:text-sm rounded-md">
          <p>
            &copy; Kim & Co {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
