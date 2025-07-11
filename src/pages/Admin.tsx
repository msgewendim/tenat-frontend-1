import { ArrowLeftCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAdminDashboard from '../components/admin/useDashboard';
import OrdersList from '../components/admin/orders';
import PackageForm from '../components/admin/packages/PackageForm';
import PackageList from '../components/admin/packages/PackageList';
import ProductForm from '../components/admin/products/ProductForm';
import ProductList from '../components/admin/products/ProductList';
import RecipeForm from '../components/admin/recipes/RecipeForm';
import RecipesList from '../components/admin/recipes/RecipesList';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { adminActiveSection, handleSubmit, productToEdit, recipeToEdit, packageToEdit,
    isProductAddError, isProductUpdateError, isProductAddSuccess, isProductUpdateSuccess, isProductAddPending, isProductUpdatePending,
    isRecipeAddError, isRecipeUpdateError, isRecipeAddSuccess, isRecipeUpdateSuccess, isRecipeAddPending, isRecipeUpdatePending,
    isPackageAddError, isPackageUpdateError, isPackageAddSuccess, isPackageUpdateSuccess, isPackageAddPending, isPackageUpdatePending,
    productAddError, productUpdateError, recipeAddError, recipeUpdateError, packageAddError, packageUpdateError
   } = useAdminDashboard();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col md:flex-row gap-4 min-h-screen bg-gray-100 mt-18" dir='rtl'>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-[50%] right-4 z-20 bg-gray-800 text-white p-2 rounded"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <XMarkIcon width={24} /> : <ArrowLeftCircleIcon width={24} />}
      </button>

      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 bg-gray-800 text-white mt-16">
        <nav className="mt-6">
          <h1 className="text-2xl font-bold text-white pb-2 text-center">{t('admin.dashboardTitle')}</h1>
          <NavList setIsMenuOpen={setIsMenuOpen} />
        </nav>
      </aside>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 text-white z-10 overflow-y-auto">
          <nav className="mt-16 p-4">
            <h1 className="text-2xl font-bold text-white pb-2 text-center">{t('admin.dashboardTitle')}</h1>
            <NavList setIsMenuOpen={setIsMenuOpen} />
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="w-full mt-20 px-4">
        {adminActiveSection === 'products' && <ProductList />}
        {(adminActiveSection === 'add-product' || adminActiveSection === 'edit-product') && (
          <ProductForm
            item={productToEdit}
            onSubmit={handleSubmit}
            mutateFormState={{ 
              isError : isProductAddError || isProductUpdateError, 
              isSuccess: isProductAddSuccess || isProductUpdateSuccess, 
              isLoading: isProductAddPending || isProductUpdatePending,
              error: productAddError || productUpdateError
            }}
            message={adminActiveSection === 'edit-product' ? t('admin.productUpdated') : t('admin.productAdded')}
          />
        )}
        {adminActiveSection === 'recipes' && <RecipesList />}
        {(adminActiveSection === 'add-recipe' || adminActiveSection === 'edit-recipe') && (
          <RecipeForm
            item={recipeToEdit}
            onSubmit={handleSubmit}
            message={adminActiveSection === 'edit-recipe' ? t('admin.recipeUpdated') : t('admin.recipeAdded')}
            mutateFormState={{ 
              isError : isRecipeAddError || isRecipeUpdateError, 
              isSuccess: isRecipeAddSuccess || isRecipeUpdateSuccess, 
              isLoading: isRecipeAddPending || isRecipeUpdatePending,
              error: recipeAddError || recipeUpdateError
            }}
          />
        )}
        {adminActiveSection === 'packages' && <PackageList />}
        {(adminActiveSection === 'add-package' || adminActiveSection === 'edit-package') && (
          <PackageForm
            item={packageToEdit}
            onSubmit={handleSubmit}
            mutateFormState={{ 
              isError : isPackageAddError || isPackageUpdateError, 
              isSuccess: isPackageAddSuccess || isPackageUpdateSuccess, 
              isLoading: isPackageAddPending || isPackageUpdatePending,
              error: packageAddError || packageUpdateError
            }}
            message={adminActiveSection === 'edit-package' ? t('admin.packageUpdated') : t('admin.packageAdded')}
          />
        )}
        {adminActiveSection === 'orders' && <OrdersList />}
      </main>
    </div>
  );
};
const NavList = ({ setIsMenuOpen }: {
  setIsMenuOpen: (open: boolean) => void,
}) => {
  const { t } = useTranslation();
  const { adminActiveSection, setAdminActiveSection, } = useAdminDashboard();

  const navItems = [
    { id: 'products', label: t('admin.products.title') },
    { id: 'recipes', label: t('admin.recipes.title') },
    { id: 'packages', label: t('admin.packages.title') },
    { id: 'orders', label: t('admin.orders.title') },
    { id: 'add-product', label: t('admin.addProduct') },
    { id: 'add-package', label: t('admin.packages.add') },
    { id: 'add-recipe', label: t('admin.addRecipe') },
  ];
  return (
    <ul>
      {navItems.map(({ id, label }) => (
        <li
          key={id}
          className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${adminActiveSection === id ? 'bg-gray-700' : ''}`}
          onClick={() => {
            setAdminActiveSection(id);
            setIsMenuOpen(false);
          }}
        >
          {label}
        </li>
      ))}
    </ul>
  )
}
export default AdminDashboard;