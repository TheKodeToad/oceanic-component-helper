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
import { ApplicationCommandTypes, Client, InteractionTypes, MessageFlags, SeparatorSpacingSize } from "oceanic.js";
import { ActionRow, Container, Divider, File, Gallery, GalleryItem, Section, SelectOption, Spacer, StringSelect, Text, TextButton, Thumbnail } from "oceanic-component-helper";

const client = new Client({
	auth: "Bot " + process.env.BOT_TOKEN,
	gateway: {
		intents: [] // interactions need no intents
	}
});

client.on("ready", async() => {
	console.log("Ready as", client.user.tag);

	await client.application.bulkEditGlobalCommands([
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
					ActionRow([TextButton("Button", "button")]),
					ActionRow([StringSelect(
						"select",
						[SelectOption("Option 1", "1"), SelectOption("Option 2", "2")]
					)]),
					Container([
						ActionRow([TextButton("Button", "container_button")]),
						ActionRow([StringSelect(
							"container_select",
							[SelectOption("Option 1", "1"), SelectOption("Option 2", "2")]
						)]),
						Gallery([
							GalleryItem("attachment://image.png", { description: "Oceanic Icon" }),
							GalleryItem("https://i.furry.cool/DonPride.png", { description: "Donovan_DMC's Icon" })
						]),
						Text("Small separator with divider below"),
						Divider(SeparatorSpacingSize.SMALL),
						Section(["Section Text"], Thumbnail("attachment://image.png")),
						Spacer(SeparatorSpacingSize.LARGE),
						Section(["Large separator with no divider above"], Thumbnail("https://i.oceanic.ws/icon.png")),
						Section(["Even More Section Text"], TextButton("Button", "container_section_button"))
					]),
					File("file.txt"),
					Gallery([GalleryItem("https://i.furry.cool/DonCoffee.png", { description: "Donovan Coffee" })])
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
