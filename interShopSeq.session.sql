SELECT models.id, brand_id, brands.title, count(brand_id) FROM models
JOIN brands
ON models.brand_id = brands.id
GROUP BY brand_id,  brands.title, models.id
ORDER BY models.id;

