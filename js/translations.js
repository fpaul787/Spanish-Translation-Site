// All JavaScript objects inherit 
// properties and methods from a prototype.
// the prototype of this
// inherits from Object
const kitchenBank = {
    'Kitchen': 'Cocina', 'Table': 'Mesa', 'Oven': 'Horno', 'Stove': 'Estufa',
    'Microwave Oven': 'Microonda', 'Plate': 'Plato', 'Napkin': 'Servilleta',
    'Knife': 'Cuchillo', 'Fork': 'Tenedor', 'Spoon': 'Chucara', 'Glass(water)': 'Vaso',
    'Cupa': 'Copa', 'Bowl': 'Cuenco/Tazón', 'Pot': 'Olla', 'Frying Pan': 'Sartén',
    'Spatula': 'Espátula'
}

const snackLunchBank = {'Snack': 'Bocadillo', 'Dessert': 'Postre', 'Cheese': 'Queso',
                    'Hot Chocolate': 'Chocolate a la Taza', 'Vanilla Custard': 'Flan',
                    'Fruit': 'Frutas', 'Apple': 'Manzanas', 'Pear': 'Pera', 'Cherries': 'Guindas/Cerezas',
                    'Strawberries': 'Fresas', 'Watermelon': 'Sandiá', 'Orange': 'Naranja',
                    'Lemon': 'Limón', 'Figs': 'Higos', 'Nuts': 'Nueces', 'Cake': 'Tarta',
                    'Cookie': 'Bollito/Galleta', 'Ice Cream': 'Helado'}

const lunchBank = {'Lunch': 'Almuerzo', 'Dinner': 'Cena', 'Food': 'Comida', 
'Potatoes': 'Patatas', 'Rice': 'Arroz', 'Soup': 'Sopa', 
'Pasta': 'Pastas', 'Salad': 'Ensalada', 'Vegetables': 'Verduras',
'Onions': '  Cebolla', 'Bell Peppers': 'Pimiento', 'Meat': 'Res',
'Pork': 'Cerdo', 'Chicken': 'Pollo', 'Fish': 'Pescado',
'Squid': 'Calamares', 'Shrimp': 'Camarones', 'Seafodd': 'Mariscos',
'Tomatoes': 'Tomate', 'Olive Oil': 'Aceite de Oliva', 
'Cucumbers': 'Pepinos', 'Garlic': 'Ajo', 'Carrots': 'Zanahoria',
'Asparagus': 'Espárragos', 'Fried Egg': 'Huevo Frito', 'Salt':'Sal',
'Pepper': 'Pimienta', 'Drinks': 'Bebidas', 'Wine': 'Vino',
'Beer': 'Cerveza', 'Water': 'agua', 'Tea': 'Té', 'Soda': 'Cola'}

const breakfastBank = {'Breakfast': 'Desayuno', 'Bread': 'Pan', 'Butter': 'Mantequilla', 
                    'Sweet rolls': 'Bollos', 'Pastry': 'Pasteleria', 'Coffee': 'Cafe', 
                    'Without': 'sin', 'Milk': 'Leche', 'Sugar': 'Azucar', 'Yoghurt': 'Yogur',
                    'Eggs': 'Huevos', 'Sausage': 'Chorizo'}

const weatherBank = {'It is hot': 'Hace calor', 'It is cold': 'Have frio', 'It is cool': 'Hace fresco',
                'The weather is nice': 'Hace buen tiempo',  'The weather is bad': 'Hace mal tiempo',
                'It is cloudy': 'Está nublado', 'It is sunny': 'Está soleado', 
                'It is clear': 'Está despejado', 'It is windy': 'Está ventoso', 
                'It is stormy': 'Está tormentoso', 'It is raining': 'Está lloviendo', 
                'It is snowing': 'Está nevando', "It's windy": 'Hay viento', 'It is foggy': 'Hay niebla',
                "It's raining pitchers/buckets": '¡Llueve a cántaros!',
                "It's raining oceans!": "¡Llueve a mares!", "I'm freezing!": '¡Me estoy congelando',}

const feelingsBank = {'I\'m happy': 'Estoy feliz', 'I\'m in love': 'Estoy enamorado', 'I\'m tired': 'Estoy cansado',
                    'I\'m excited': 'Estoy emocionado', 'I\'m frightenned': 'Estoy asustado',
                    'I\'m angry': 'Estoy enojado', 'I\'m jealous': 'Estoy celoso', 'I\'m amazed': 'Estoy sorprendido',
                    'I\'m content': 'Estoy contento', 'I\'m busy': 'Estoy ocupado', 'I\'m worried': 'Estoy preocupado',
                    'I\'m furious': 'Estoy furioso', 'I\'m sad': 'Estoy triste', 'I\'m embarrssed': 'Estoy avergonzado'}



const testBank = {'Breakfast': 'Desayuno', 'Bread': 'Pan', 'Butter': 'Mantequilla'}
const listDictionaries =  [testBank, kitchenBank, snackLunchBank, lunchBank, breakfastBank, weatherBank, feelingsBank];
export {listDictionaries}