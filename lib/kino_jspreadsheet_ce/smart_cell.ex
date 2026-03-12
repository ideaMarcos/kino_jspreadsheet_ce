defmodule KinoJspreadsheetCe.SmartCell do
  @moduledoc """
  A Kino SmartCell for configuring and generating KinoJspreadsheetCe widgets.

  Users can interactively set options like minimum dimensions, toolbar visibility,
  and context menu settings. The SmartCell generates the Elixir code to create
  the spreadsheet widget with the configured options.
  """

  use Kino.JS, assets_path: "lib/assets/smart_cell_build"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Jspreadsheet CE"

  @impl true
  def init(attrs, ctx) do
    {:ok,
     assign(ctx,
       variable_name: attrs["variable_name"] || "s1",
       min_dimensions_rows: attrs["min_dimensions_rows"] || 5,
       min_dimensions_cols: attrs["min_dimensions_cols"] || 7,
       toolbar: attrs["toolbar"] || false
     )}
  end

  @impl true
  def to_attrs(ctx) do
    %{
      "variable_name" => ctx.assigns.variable_name,
      "min_dimensions_rows" => ctx.assigns.min_dimensions_rows,
      "min_dimensions_cols" => ctx.assigns.min_dimensions_cols,
      "toolbar" => ctx.assigns.toolbar
    }
  end

  @impl true
  def to_source(attrs) do
    var_name = attrs["variable_name"] || "s1"

    opts = [
      "min_dimensions: [#{attrs["min_dimensions_cols"]}, #{attrs["min_dimensions_rows"]}]",
      "toolbar: #{attrs["toolbar"]}"
    ]

    "#{var_name} = KinoJspreadsheetCe.new(#{Enum.join(opts, ", ")})"
  end

  @impl true
  def handle_connect(ctx) do
    {:ok, to_attrs(ctx), ctx}
  end

  @impl true
  def handle_event("update", attrs, ctx) do
    ctx =
      assign(ctx,
        variable_name: attrs["variable_name"],
        min_dimensions_rows: attrs["min_dimensions_rows"],
        min_dimensions_cols: attrs["min_dimensions_cols"],
        toolbar: attrs["toolbar"]
      )

    broadcast_event(ctx, "update", to_attrs(ctx))
    {:noreply, ctx}
  end
end
