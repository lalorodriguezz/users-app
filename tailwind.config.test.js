import { describe, it, expect } from "vitest";
import tailwindConfig from "./tailwind.config.js";

describe("Tailwind CSS Configuration", () => {
  it("debe tener definida la propiedad darkMode", () => {
    expect(tailwindConfig).toHaveProperty("darkMode");
    expect(tailwindConfig.darkMode).toEqual(["class"]);
  });

  it("debe tener rutas de contenido definidas", () => {
    expect(tailwindConfig).toHaveProperty("content");
    expect(tailwindConfig.content).toContain("./index.html");
    expect(tailwindConfig.content).toContain("./src/**/*.{ts,tsx,js,jsx}");
  });

  it("debe tener extend en theme configurado", () => {
    expect(tailwindConfig).toHaveProperty("theme.extend");
  });

  describe("theme.extend.borderRadius", () => {
    it("debe tener borderRadius configurado", () => {
      expect(tailwindConfig.theme.extend).toHaveProperty("borderRadius");
    });

    it("debe contener los valores lg, md y sm", () => {
      const borderRadius = tailwindConfig.theme.extend.borderRadius;
      expect(borderRadius).toHaveProperty("lg", "var(--radius)");
      expect(borderRadius).toHaveProperty("md", "calc(var(--radius) - 2px)");
      expect(borderRadius).toHaveProperty("sm", "calc(var(--radius) - 4px)");
    });
  });

  describe("theme.extend.colors", () => {
    const colors = [
      "background",
      "foreground",
      "border",
      "input",
      "ring",
      "chart",
      "card",
      "popover",
      "primary",
      "secondary",
      "muted",
      "accent",
      "destructive",
    ];

    it("debe tener colors configurado", () => {
      expect(tailwindConfig.theme.extend).toHaveProperty("colors");
    });

    colors.forEach((color) => {
      it(`debe incluir el color ${color}`, () => {
        expect(tailwindConfig.theme.extend.colors).toHaveProperty(color);
      });
    });

    it("debe tener valores específicos para colores anidados", () => {
      expect(tailwindConfig.theme.extend.colors.card).toHaveProperty("DEFAULT");
      expect(tailwindConfig.theme.extend.colors.card).toHaveProperty(
        "foreground"
      );
      expect(tailwindConfig.theme.extend.colors.primary).toHaveProperty(
        "DEFAULT"
      );
      expect(tailwindConfig.theme.extend.colors.primary).toHaveProperty(
        "foreground"
      );
    });
  });

  it("debe tener plugins configurados", () => {
    expect(tailwindConfig).toHaveProperty("plugins");
    expect(tailwindConfig.plugins).toContain(require("tailwindcss-animate"));
  });
});
