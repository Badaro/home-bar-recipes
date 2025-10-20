import { CocktailCard } from "./CocktailCard";

interface Cocktail {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  image: string;
}

interface CategorySectionProps {
  title: string;
  cocktails: Cocktail[];
  onIngredientClick: (ingredient: string) => void;
}

export const CategorySection = ({ title, cocktails, onIngredientClick }: CategorySectionProps) => {
  if (cocktails.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="text-4xl font-serif font-bold mb-8 text-primary">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cocktails.map((cocktail) => (
          <CocktailCard
            key={cocktail.id}
            name={cocktail.name}
            ingredients={cocktail.ingredients}
            image={cocktail.image}
            onIngredientClick={onIngredientClick}
          />
        ))}
      </div>
    </section>
  );
};
