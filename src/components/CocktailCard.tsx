import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CocktailCardProps {
  name: string;
  ingredients: string[];
  image: string;
  onIngredientClick: (ingredient: string) => void;
}

export const CocktailCard = ({ name, ingredients, image, onIngredientClick }: CocktailCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border-border/50 bg-card">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">{name}</h3>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <Badge
              key={ingredient}
              variant="secondary"
              className="cursor-pointer transition-all hover:bg-accent hover:text-accent-foreground"
              onClick={(e) => {
                e.stopPropagation();
                onIngredientClick(ingredient);
              }}
            >
              {ingredient}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};
