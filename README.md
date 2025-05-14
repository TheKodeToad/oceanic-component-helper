# oceanic-component-helper
Use Discord Components with style. This is designed for Oceanic.js but has no runtime dependencies!
If support for raw components is added in future, it certainly should support Discord.js and Dysnomia too.

```
npm install oceanic-component-helper
pnpm install oceanic-component-helper
```

## Usage

Usage Example:
```js
const container = Container([
    Text("## Hello World"),
    Divider(), // horizontal line
    Gallery([
        GalleryItem("https://discord.ceo/man.png"),
        GalleryItem("https://upload.wikimedia.org/wikipedia/commons/d/de/Nokota_Horses_cropped.jpg")
    ]),
    Spacer(SeparatorSpacingSize.LARGE), // blank vertical space
    ActionRow([
        TextButton("This does nothing", "nothing"),
        TextButton("This does something", "something"),
        URLButton("Cool music", "https://www.youtube.com/watch?v=FgXYzF5-Yiw"),
    ]),
    Section(["# Wires?"], Thumbnail("https://static.wikia.nocookie.net/silly-cat/images/4/4f/Wire_Cat.png/revision/latest"))
    Divider(),
    Text("## Order Food"),
    Section(
        ["**Deep-fried Mars Bar**", "-# A true classic"],
        TextButton("Order", "mars", { style: ButtonStyles.SUCCESS })
    ),
    Section(
        ["**Fish and Chips**", "-# What are you? British or something?"],
        TextButton("Order", "chips", { style: ButtonStyles.SUCCESS })
    ),
    Spacer(),
    Text("## There is only one correct option"),
    StringSelect(
        "beverage",
        [
            SelectOption("Pepsi", "pepsi"),
            SelectOption("Coke", "coke"),
        ],
        { placeholder: "Pick your poison" }
    ),
]);

await channel.createMessage({ flags: MessageFlags.IS_COMPONENTS_V2, components: [container] });
```
![Screen Shot 2025-05-14 at 20 01 49](https://github.com/user-attachments/assets/e32e0639-c2ea-409f-a740-91ca2fe2c804)

Mutation is allowed too - this works just fine as a lighter builder alternative:
```js
const container = Container();

container.components.push(Text("## Available toppings"));

for (const topping of toppings)
    container.component.push(Text("- " + toppings));
```

Every component can take in additional properties - so fear not if you need to set and additional value! For example you might do this to set the accent colour of a container:
```js
Container([Text("hi")], { accentColor: 0xFF0000 });
```
You (should) be able to use new properties as soon as they are added if you have a recent enough oceanic.js version!

The available component functions do not entirely reflect the Oceanic interfaces. For example:
- Menu components do not have the `Menu` suffix
- No components have the `Component` suffix
- `TextDisplay` is shortened to `Text`
- `MediaGallery` is shortened to `Gallery`
- `Separator` is seperated (haha) into `Divider` and `Spacer` for `{ divider: true | undefined }` and `{ divider: false }` respectively.
- `TextInput` is separated by type: `LineInput` and `ParagraphInput`

## Pitfalls
- Imports may conflict with type imports from oceanic.

  Fix this by adding an alias:
  ```js
  import { SelectOption as SelectOption_ } from "oceanic-component-helper";
  ```
  or
  ```js
  const { SelectOption: SelectOption_ } = require("oceanic-component-helper");
  ```
- Child components must be contained in an array.

  ❌ Incorrect
  ```js
  Container(Text("hi"))
  ```
  ✅ Correct
  ```js
  Container([Text("hi")])
  ```
- Sections contain strings instead of components.

  Since only text display components are allowed, you must specify them as a list of strings which automatically get mapped for you

  ❌ Incorrect
  ```js
  Section([Text("## Discord's CEO"), Text("An image of Discord's CEO, as of April 2025.")], Thumbnail("https://discord.ceo/man.png"))
  ```
  ✅ Correct
  ```js
  Section(["## Discord's CEO", "An image of Discord's CEO, as of April 2025."], Thumbnail("https://discord.ceo/man.png"))
  ```
- Mapping with component function - map passes in more than just the value.
  All components take extra properties, even `Text`! This won't usually cause issues in JavaScript, but I would still not recommend it in case it does cause issues in future.

  ❌ Incorrect
  ```js
  ["Welcome to the server!", "**Select roles below:**"].map(Text)
  ```
   ✅ Correct
  ```js
  ["Welcome to the server!", "**Select roles below:**"].map(content => Text(content))
  ```
