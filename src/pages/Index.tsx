import { useState } from "react";
import { CategorySection } from "@/components/CategorySection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import cocktailsData from "@/data/cocktails.json";
import oldFashionedImg from "@/assets/old-fashioned.jpg";
import negroniImg from "@/assets/negroni.jpg";
import manhattanImg from "@/assets/manhattan.jpg";
import margaritaImg from "@/assets/margarita.jpg";
import mojitoImg from "@/assets/mojito.jpg";
import whiskeySourImg from "@/assets/whiskey-sour.jpg";
import daiquiriImg from "@/assets/daiquiri.jpg";
import martiniImg from "@/assets/martini.jpg";
import cosmopolitanImg from "@/assets/cosmopolitan.jpg";
import pinaColadaImg from "@/assets/pina-colada.jpg";
import maiTaiImg from "@/assets/mai-tai.jpg";

const imageMap: Record<string, string> = {
  "old-fashioned.jpg": oldFashionedImg,
  "negroni.jpg": negroniImg,
  "manhattan.jpg": manhattanImg,
  "margarita.jpg": margaritaImg,
  "mojito.jpg": mojitoImg,
  "whiskey-sour.jpg": whiskeySourImg,
  "daiquiri.jpg": daiquiriImg,
  "martini.jpg": martiniImg,
  "cosmopolitan.jpg": cosmopolitanImg,
  "pina-colada.jpg": pinaColadaImg,
  "mai-tai.jpg": maiTaiImg,
};

interface Cocktail {
  id: string;
  name: string;
  category: string;
  ingredients: string[];
  image: string;
}

const Index = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);

  const cocktailsWithImages: Cocktail[] = cocktailsData.cocktails.map((cocktail) => ({
    ...cocktail,
    image: imageMap[cocktail.image] || cocktail.image,
  }));

  const filteredCocktails = selectedIngredient
    ? cocktailsWithImages.filter((cocktail) =>
        cocktail.ingredients.includes(selectedIngredient)
      )
    : cocktailsWithImages;

  const barmanCocktails = filteredCocktails.filter((c) => c.category === "barman");
  const otherCocktails = filteredCocktails.filter((c) => c.category === "other");
  const unavailableCocktails = filteredCocktails.filter((c) => c.category === "unavailable");

  const handleIngredientClick = (ingredient: string) => {
    setSelectedIngredient(ingredient);
  };

  const clearFilter = () => {
    setSelectedIngredient(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            The Home Bar
          </h1>
          <p className="text-center text-muted-foreground mt-2 text-lg">
            Curated cocktails for the discerning palate
          </p>
        </div>
      </header>

      {/* Filter Badge */}
      {selectedIngredient && (
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">Filtering by:</span>
            <Badge variant="default" className="text-base px-4 py-2 gap-2">
              {selectedIngredient}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={clearFilter}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <CategorySection
          title="Barman's Recommendations"
          cocktails={barmanCocktails}
          onIngredientClick={handleIngredientClick}
        />
        <CategorySection
          title="Other Drinks"
          cocktails={otherCocktails}
          onIngredientClick={handleIngredientClick}
        />
        <CategorySection
          title="Ingredients Not Available"
          cocktails={unavailableCocktails}
          onIngredientClick={handleIngredientClick}
        />

        {filteredCocktails.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">
              No cocktails found with {selectedIngredient}
            </p>
            <Button onClick={clearFilter} className="mt-4">
              Clear Filter
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>Crafted with care for the home mixologist</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
