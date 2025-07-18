import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

import ProductCard from "./ProductCard";
import { Product } from "../../client/types.gen";
import useRandomCards from "../../hooks/app/useRandomCards";
import { CarouselButtonProps } from "../../providers/interface/general.props";
import { makeBreakLine } from "../../utils/helperFunctions";
import Loader from "../ui/Loader";

const TopProducts = () => {
  const { t } = useTranslation();
  const { data: products, isLoading, handleNext, handlePrevious, page, totalPages } = useRandomCards<Product>({
    endpoint: '/products/random',
  })

  return (
    <section className="bg-[#F9F8F8] dark:bg-gray-900 py-12" lang="he">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-3 dark:text-gray-100">
            <Link to="/products" className="cursor-pointer">
              {t('homePage.topProducts.title')}
            </Link>
          </h2>
          <p className="text-primary max-w-3xl mx-auto dark:text-gray-100">
            {makeBreakLine(t('homePage.topProducts.description')).map((paragraph, index) => (
              <span key={index} >{paragraph}</span>
            ))}
          </p>
        </header>

        <div className="relative">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex justify-center items-center gap-10 my-5">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <CarouselButton
            onClick={handlePrevious}
            disabled={page === 1}
            direction="previous"
            ariaLabel={t('homePage.topProducts.previous')}
          >
            <IoIosArrowBack />
          </CarouselButton>

          <CarouselButton
            onClick={handleNext}
            disabled={page === totalPages}
            direction="next"
            ariaLabel={t('homePage.topProducts.next')}
          >
            <IoIosArrowForward />
          </CarouselButton>
        </div>
      </div>
    </section>
  );
};

const CarouselButton: FC<CarouselButtonProps> = ({ onClick, disabled, direction, children, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 -translate-y-1/2 ${direction === 'previous' ? 'left-0' : 'right-0'} z-20 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none`}
    aria-label={ariaLabel}
  >
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-secondary_btn group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
      {children}
    </span>
  </button>
);

export default TopProducts;