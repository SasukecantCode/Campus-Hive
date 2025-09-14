"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/layout/navigation"
import Sidebar from "@/components/layout/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UtensilsCrossed, Plus, Edit, Trash2, Calendar, Sparkles, CheckCircle } from "lucide-react"

export default function MenuManagementPage() {
  const [currentMenu] = useState([
    {
      id: 1,
      category: "North Indian",
      items: [
        { name: "Dal Makhani", nutrition: "Protein: 8g, Carbs: 25g, Fat: 12g", calories: 280 },
        { name: "Butter Naan", nutrition: "Protein: 6g, Carbs: 35g, Fat: 8g", calories: 220 },
        { name: "Jeera Rice", nutrition: "Protein: 4g, Carbs: 45g, Fat: 2g", calories: 210 },
      ],
      price: 120,
      type: "regular",
      image: null,
    },
    {
      id: 2,
      category: "South Indian",
      items: [
        { name: "Sambar", nutrition: "Protein: 6g, Carbs: 20g, Fat: 3g", calories: 120 },
        { name: "Coconut Rice", nutrition: "Protein: 5g, Carbs: 40g, Fat: 8g", calories: 240 },
        { name: "Papad", nutrition: "Protein: 3g, Carbs: 15g, Fat: 1g", calories: 80 },
      ],
      price: 100,
      type: "regular",
      image: null,
    },
    {
      id: 3,
      category: "Festival Special - Onam",
      items: [
        { name: "Sadya Thali", nutrition: "Protein: 15g, Carbs: 80g, Fat: 20g", calories: 520 },
        { name: "Payasam", nutrition: "Protein: 8g, Carbs: 45g, Fat: 15g", calories: 320 },
        { name: "Banana Chips", nutrition: "Protein: 2g, Carbs: 25g, Fat: 10g", calories: 180 },
      ],
      price: 200,
      type: "festival",
      image: null,
    },
  ])

  const [newMenuItem, setNewMenuItem] = useState({
    category: "",
    items: [{ name: "", nutrition: "", calories: "" }],
    price: "",
    type: "regular",
    image: null as File | null,
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleAddItem = () => {
    setNewMenuItem({
      ...newMenuItem,
      items: [...newMenuItem.items, { name: "", nutrition: "", calories: "" }],
    })
  }

  const handleRemoveItem = (index: number) => {
    const updatedItems = newMenuItem.items.filter((_, i) => i !== index)
    setNewMenuItem({ ...newMenuItem, items: updatedItems })
  }

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = newMenuItem.items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setNewMenuItem({ ...newMenuItem, items: updatedItems })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewMenuItem({ ...newMenuItem, image: file })
    }
  }

  const handleSubmitMenu = () => {
    console.log("Adding new menu item:", newMenuItem)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setIsDialogOpen(false)
      setNewMenuItem({
        category: "",
        items: [{ name: "", nutrition: "", calories: "" }],
        price: "",
        type: "regular",
        image: null,
      })
    }, 2000)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "festival":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "special":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "festival" ? <Sparkles className="w-4 h-4 mr-1" /> : null
  }

  return (
    <div className="min-h-screen bg-campus-cream">
      <Navigation userType="food-manager" />

      <div className="flex">
        <Sidebar userType="food-manager" />

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-campus-green-dark mb-2">Menu Management</h1>
                <p className="text-gray-600">Create and update daily menus with nutritional information.</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-campus-green-dark hover:bg-campus-green-light rounded-apple">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Menu Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-apple max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-campus-green-dark">Add New Menu Item</DialogTitle>
                    <DialogDescription>Create a new menu category with food items and details.</DialogDescription>
                  </DialogHeader>

                  {!submitted ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Menu Category</Label>
                          <Input
                            id="category"
                            placeholder="e.g., North Indian Thali"
                            value={newMenuItem.category}
                            onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                            className="rounded-apple"
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="120"
                            value={newMenuItem.price}
                            onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                            className="rounded-apple"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="type">Menu Type</Label>
                        <Select
                          value={newMenuItem.type}
                          onValueChange={(value) => setNewMenuItem({ ...newMenuItem, type: value })}
                        >
                          <SelectTrigger className="rounded-apple">
                            <SelectValue placeholder="Select menu type" />
                          </SelectTrigger>
                          <SelectContent className="rounded-apple">
                            <SelectItem value="regular">Regular Menu</SelectItem>
                            <SelectItem value="special">Special Menu</SelectItem>
                            <SelectItem value="festival">Festival Special</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Food Items</Label>
                        <div className="space-y-3 mt-2">
                          {newMenuItem.items.map((item, index) => (
                            <div key={index} className="p-3 border border-campus-beige rounded-apple bg-campus-cream">
                              <div className="grid grid-cols-1 gap-3">
                                <div>
                                  <Label htmlFor={`item-name-${index}`}>Item Name</Label>
                                  <Input
                                    id={`item-name-${index}`}
                                    placeholder="e.g., Dal Makhani"
                                    value={item.name}
                                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                                    className="rounded-apple"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`item-nutrition-${index}`}>Nutrition Info</Label>
                                  <Input
                                    id={`item-nutrition-${index}`}
                                    placeholder="e.g., Protein: 8g, Carbs: 25g, Fat: 12g"
                                    value={item.nutrition}
                                    onChange={(e) => handleItemChange(index, "nutrition", e.target.value)}
                                    className="rounded-apple"
                                  />
                                </div>
                                <div className="flex gap-3">
                                  <div className="flex-1">
                                    <Label htmlFor={`item-calories-${index}`}>Calories</Label>
                                    <Input
                                      id={`item-calories-${index}`}
                                      type="number"
                                      placeholder="280"
                                      value={item.calories}
                                      onChange={(e) => handleItemChange(index, "calories", e.target.value)}
                                      className="rounded-apple"
                                    />
                                  </div>
                                  {newMenuItem.items.length > 1 && (
                                    <div className="flex items-end">
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRemoveItem(index)}
                                        className="rounded-apple bg-transparent"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddItem}
                          className="mt-3 rounded-apple bg-transparent"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Another Item
                        </Button>
                      </div>

                      <div>
                        <Label htmlFor="image">Upload Food Image (Optional)</Label>
                        <div className="mt-2">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="rounded-apple"
                          />
                          <p className="text-xs text-gray-500 mt-1">Upload an appetizing photo of the food items</p>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSubmitMenu}
                          className="flex-1 bg-campus-green-dark hover:bg-campus-green-light rounded-apple"
                          disabled={
                            !newMenuItem.category || !newMenuItem.price || newMenuItem.items.some((item) => !item.name)
                          }
                        >
                          Add to Menu
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          className="flex-1 rounded-apple"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-campus-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-campus-green-dark mb-2">Menu Item Added!</h3>
                      <p className="text-gray-600">
                        The new menu item has been added and will be available for students to order.
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {/* Menu Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="rounded-apple border-campus-green-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Menu Items</p>
                      <p className="text-2xl font-bold text-campus-green-dark">{currentMenu.length}</p>
                    </div>
                    <UtensilsCrossed className="w-8 h-8 text-campus-green-light" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Regular Items</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {currentMenu.filter((item) => item.type === "regular").length}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Festival Specials</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {currentMenu.filter((item) => item.type === "festival").length}
                      </p>
                    </div>
                    <Sparkles className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-apple border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Price</p>
                      <p className="text-2xl font-bold text-green-600">
                        ₹{Math.round(currentMenu.reduce((acc, item) => acc + item.price, 0) / currentMenu.length)}
                      </p>
                    </div>
                    <UtensilsCrossed className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Menu */}
            <Card className="rounded-apple border-campus-green-light">
              <CardHeader>
                <CardTitle className="text-campus-green-dark">Current Menu</CardTitle>
                <CardDescription>Manage today's food offerings and their details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentMenu.map((menuItem) => (
                    <div key={menuItem.id} className="p-6 bg-campus-cream rounded-apple border border-campus-beige">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-campus-green-dark">{menuItem.category}</h3>
                            <Badge className={`rounded-apple ${getTypeColor(menuItem.type)}`}>
                              {getTypeIcon(menuItem.type)}
                              {menuItem.type.charAt(0).toUpperCase() + menuItem.type.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-lg font-medium text-campus-green-dark">₹{menuItem.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="rounded-apple bg-transparent">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-apple text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {menuItem.items.map((item, index) => (
                          <div key={index} className="p-4 bg-white rounded-apple border border-campus-beige">
                            <h4 className="font-semibold text-campus-green-dark mb-2">{item.name}</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                <strong>Nutrition:</strong> {item.nutrition}
                              </p>
                              <p>
                                <strong>Calories:</strong> {item.calories} kcal
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {menuItem.type === "festival" && (
                        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-apple">
                          <p className="text-sm text-purple-700 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" />
                            <strong>Festival Special:</strong> This menu is highlighted for the special occasion and
                            will attract more orders.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
