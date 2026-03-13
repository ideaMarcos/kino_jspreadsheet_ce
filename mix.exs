defmodule KinoJspreadsheetCe.MixProject do
  use Mix.Project

  @version "0.1.0"
  @description "Jspreadsheet CE integration for Livebook"

  def project do
    [
      app: :kino_jspreadsheet_ce,
      version: @version,
      description: @description,
      name: "KinoJspreadsheetCe",
      elixir: "~> 1.18",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      docs: docs(),
      package: package()
    ]
  end

  def application do
    [
      mod: {KinoJspreadsheetCe.Application, []},
      extra_applications: []
    ]
  end

  defp deps do
    [
      {:kino, "~> 0.19"},
      {:table, "~> 0.1.0"},
      {:ex_doc, ">= 0.0.0", only: :dev, runtime: false}
    ]
  end

  defp docs do
    [
      main: "demo",
      source_url: "https://github.com/ideamarcos/kino_jspreadsheet_ce",
      source_ref: "v#{@version}",
      extras: ["guides/demo.livemd"]
    ]
  end

  def package do
    [
      licenses: ["MIT"],
      links: %{
        "GitHub" => "https://github.com/ideamarcos/kino_jspreadsheet_ce"
      }
    ]
  end
end
