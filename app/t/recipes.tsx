import Image from "next/image";
import z from "zod";

const recipeSchema = z.object({
  id: z.string(),
  image: z.string(),
  title: z.string(),
  description: z.string(),
  isVeg: z.boolean(),
});

type Recipe = z.infer<typeof recipeSchema>;

const recipesListSchema = z.array(recipeSchema);

export async function fetchRecipes(
  query: string,
  veg: boolean,
): Promise<Recipe[]> {
  try {
    const response = await fetch(
      `https//api-res.com/recipes?q=${query}&veg=${veg}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.status}`);
    }

    const json: unknown = await response.json();
    const result = recipesListSchema.safeParse(json);

    if (!result.success) {
      throw new Error("Invalid article payload from API");
    }

    return result.data;
  } catch (error) {
    // optionally log here
    throw error;
  }
}

const mockRecipes = [
  {
    id: "1",
    image: "https://picsum.photos/seed/salad/600/400",
    title: "Veg Pasta",
    description: "Simple vegetarian pasta",
    isVeg: true,
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/salad/600/400",
    title: "Classic Burger",
    description: "Juicy beef burger",
    isVeg: false,
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/salad/600/400",
    title: "Fresh Garden Salad",
    description: "Crisp vegetables with a light vinaigrette",
    isVeg: true,
  },
  {
    id: "4",
    image: "https://picsum.photos/seed/pizza/600/400",
    title: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    isVeg: true,
  },
  {
    id: "5",
    image: "https://picsum.photos/seed/steak/600/400",
    title: "Grilled Steak",
    description: "Tender grilled steak with herbs and garlic butter",
    isVeg: false,
  },
];

export async function fetchRec(query: string, veg: boolean): Promise<Recipe[]> {
  console.log(`searchParams: ${query}, ${veg}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const normalizedQuery = query.toLowerCase();

        const filtered = mockRecipes.filter((recipe) => {
          const matchesVeg = veg ? recipe.isVeg : true;

          const matchesQuery =
            recipe.title.toLowerCase().includes(normalizedQuery) ||
            recipe.description.toLowerCase().includes(normalizedQuery);

          return matchesVeg && matchesQuery;
        });

        const result = recipesListSchema.safeParse(filtered);

        if (!result.success) {
          reject(new Error("Invalid mock payload"));
          return;
        }

        resolve(result.data);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

export default async function Recipes({
  query,
  veg,
}: {
  query: string;
  veg: boolean;
}) {
  const recipes = await fetchRec(query, veg);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((item: Recipe) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
        >
          <div className="relative">
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={300}
              className="h-60 w-full object-cover"
            />

            {item.isVeg && (
              <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                Veg
              </span>
            )}
          </div>

          <div className="space-y-2 p-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {item.title}
            </h3>

            <p className="line-clamp-2 text-sm text-gray-600">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
