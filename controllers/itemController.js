const supabase = require("../config/supabaseConfig");

exports.getIndex = (req, res) => {
  res.render("index");
};

//select * from items
exports.getItems = async (req, res) => {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error(error);
    res.redirect("/items?error=true");
  } else {
    res.render("item", { items: data });
  }
};

// Create
exports.createItem = async (req, res) => {
  const { data, error } = await supabase.from("items").insert([req.body]);
  if (error) {
    console.error(error);
    res.redirect("/item?error=true");
  } else {
    res.redirect("/item");
  }
};

// Update
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("items")
    .update(req.body)
    .eq("id", id);

  if (error) {
    console.error(error);
    res.redirect("/item?error=true");
  } else {
    res.redirect("/item");
  }
};

// Delete
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { data, error } = await supabase.from("items").delete().eq("id", id);
  if (error) {
    console.error(error);
    res.redirect("/item?error=true");
  } else {
    res.status(200).json({ message: "Item deleted successfully" });
  }
};
