// Modified from https://github.com/OceanicJS/Oceanic/blob/dev/examples/components_v2.js
// Refactored to use oceanic-component-helper

/**
 * MIT License
 *
 * Copyright (c) 2023 Donovan Daniels
 * Copyright (c) 2025 TheKodeToad
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { readFileSync } from "fs";
import { actionRow, container, file, mediaGallery, mediaGalleryItem, section, selectOption, separator, stringSelectMenu, textButton, textDisplay, thumbnail } from "oceanic-component-helper";
import { ApplicationCommandTypes, ButtonStyles, Client, ComponentTypes, InteractionTypes, MessageFlags, SeparatorSpacingSize } from "oceanic.js";

const client = new Client({
    auth: "Bot [TOKEN]",
    gateway: {
        intents: [] // interactions need no intents
    }
});

const GUILD_ID = "";
client.on("ready", async() => {
    console.log("Ready as", client.user.tag);

    await client.application.bulkEditGuildCommands(GUILD_ID, [
        {
            type: ApplicationCommandTypes.CHAT_INPUT,
            name: "test",
            description: "Test"
        }
    ]);
});

// See the components example for a further explanation of action row, button, and select components

// All usages of Components V2 require the IS_COMPONENTS_V2 flag
// When using Components V2 you cannot use content or embeds
client.on("interactionCreate", async interaction => {
    if (interaction.type === InteractionTypes.APPLICATION_COMMAND) {
        if (interaction.data.name === "test") {
            return interaction.createMessage({
                flags: MessageFlags.IS_COMPONENTS_V2,
                components: [
                    actionRow([textButton("Button", "button")]),
                    stringSelectMenu(
                        "select",
                        [selectOption("Option 1", "1"), selectOption("Option 2", "2")]
                    ),
                    container([
                        actionRow([textButton("Button", "container_button")]),
                        stringSelectMenu(
                            "container_select",
                            [selectOption("Option 1", "1"), selectOption("Option 2", "2")]
                        ),
                        mediaGallery([
                            mediaGalleryItem("attachment://image.png", { description: "Oceanic Icon" }),
                            mediaGalleryItem("https://i.furry.cool/DonPride.png", { description: "Donovan_DMC's Icon" })
                        ]),
                        textDisplay("Small separator with divider below"),
                        separator({ spacing: SeparatorSpacingSize.SMALL, divider: true }),
                        section(["Section Text"], thumbnail("attachment://image.png")),
                        separator({ spacing: SeparatorSpacingSize.LARGE, divider: false }),
                        section(["Large separator with no divider above"], thumbnail("https://i.oceanic.ws/icon.png")),
                        section(["Even More Section Text"], textButton("Button", "container_section_button"))
                    ]),
                    file("file.txt"),
                    mediaGallery([mediaGalleryItem("https://i.furry.cool/DonCoffee.png", { description: "Donovan Coffee" })])
                ],
                files: [
                    {
                        name: "image.png",
                        contents: readFileSync(`${import.meta.dirname}/image.png`)
                    },
                    {
                        name: "file.txt",
                        contents: Buffer.from("Text File")
                    }
                ]
            });
        }
    }
});

// An error handler
client.on("error", (error) => {
    console.error("Something went wrong:", error);
});

// Connect to Discord
client.connect();