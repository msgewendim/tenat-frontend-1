import { t } from "i18next";
import { BiCart } from "react-icons/bi";

import { useCartStore } from "../../stores/useCartStore";
import { useAppContext } from "../../hooks/app/useAppContext";

const FloatingCartButton = () => {
  const { setOpenCart } = useAppContext();
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={() => setOpenCart(true)}
      className="relative flex items-center justify-center p-2 transition-colors rounded-full text-primary dark:text-white bg-transparent hover:bg-secondary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:hover:ring-gray-500"
      aria-label={t('shop.openCart')}
    >
      <BiCart size={24} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}

export default FloatingCartButton;