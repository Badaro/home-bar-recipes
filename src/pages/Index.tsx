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
import espressoMartiniImg from "@/assets/espresso-martini.jpg";
import sazeracImg from "@/assets/sazerac.jpg";
import boulevardierImg from "@/assets/boulevardier.jpg";
import aperolSpritzImg from "@/assets/aperol-spritz.jpg";
import vieuxCarreImg from "@/assets/vieux-carre.jpg";
import penicillinImg from "@/assets/penicillin.jpg";
import mojitoImg from "@/assets/mojito.jpg";
import whiskeySourImg from "@/assets/whiskey-sour.jpg";
import daiquiriImg from "@/assets/daiquiri.jpg";
import martiniImg from "@/assets/martini.jpg";
import ginTonicImg from "@/assets/gin-tonic.jpg";
import darkAndStormyImg from "@/assets/dark-and-stormy.jpg";
import moscowMuleImg from "@/assets/moscow-mule.jpg";
import palomaImg from "@/assets/paloma.jpg";
import tomCollinsImg from "@/assets/tom-collins.jpg";
import mintJulepImg from "@/assets/mint-julep.jpg";
import cosmopolitanImg from "@/assets/cosmopolitan.jpg";
import pinaColadaImg from "@/assets/pina-colada.jpg";
import maiTaiImg from "@/assets/mai-tai.jpg";
import bloodyMaryImg from "@/assets/bloody-mary.jpg";
import aviationImg from "@/assets/aviation.jpg";
import brambleImg from "@/assets/bramble.jpg";
import corpseReviverImg from "@/assets/corpse-reviver.jpg";
import cloverClubImg from "@/assets/clover-club.jpg";
import southsideImg from "@/assets/southside.jpg";
import french75Img from "@/assets/french-75.jpg";

const imageMap: Record<string, string> = {
  "old-fashioned.jpg": oldFashionedImg,
  "negroni.jpg": negroniImg,
  "manhattan.jpg": manhattanImg,
  "margarita.jpg": margaritaImg,
  "espresso-martini.jpg": espressoMartiniImg,
  "sazerac.jpg": sazeracImg,
  "boulevardier.jpg": boulevardierImg,
  "aperol-spritz.jpg": aperolSpritzImg,
  "vieux-carre.jpg": vieuxCarreImg,
  "penicillin.jpg": penicillinImg,
  "mojito.jpg": mojitoImg,
  "whiskey-sour.jpg": whiskeySourImg,
  "daiquiri.jpg": daiquiriImg,
  "martini.jpg": martiniImg,
  "gin-tonic.jpg": ginTonicImg,
  "dark-and-stormy.jpg": darkAndStormyImg,
  "moscow-mule.jpg": moscowMuleImg,
  "paloma.jpg": palomaImg,
  "tom-collins.jpg": tomCollinsImg,
  "mint-julep.jpg": mintJulepImg,
  "cosmopolitan.jpg": cosmopolitanImg,
  "pina-colada.jpg": pinaColadaImg,
  "mai-tai.jpg": maiTaiImg,
  "bloody-mary.jpg": bloodyMaryImg,
  "aviation.jpg": aviationImg,
  "bramble.jpg": brambleImg,
  "corpse-reviver.jpg": corpseReviverImg,
  "clover-club.jpg": cloverClubImg,
  "southside.jpg": southsideImg,
  "french-75.jpg": french75Img,
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
