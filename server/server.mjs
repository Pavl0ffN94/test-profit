import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(process.cwd(), 'public/mockData.json');

// Получить данные организаций
app.get('/api/organizations', (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
});

// Получить данные сотрудников по ID организации
app.get('/api/organizations/:id/employees', (req, res) => {
  const { id } = req.params;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    const organizations = JSON.parse(data); 


    
    // Сравниваем id как строку
    const organization = organizations.find(org => org.id === id);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organization.employees);
  });
});

// Добавить организацию
app.post('/api/organizations', (req, res) => {
  const newOrganization = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    const organizations = JSON.parse(data).organizations;
    organizations.push(newOrganization);

    fs.writeFile(dataFilePath, JSON.stringify({ organizations }, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data' });
      }
      res.status(201).json(newOrganization);
    });
  });
});

// Обновить организацию
app.put('/api/organizations/:id', (req, res) => {
  const { id } = req.params;
  const updatedOrganization = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    const organizations = JSON.parse(data).organizations;
    const index = organizations.findIndex(org => org.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    organizations[index] = { ...organizations[index], ...updatedOrganization };

    fs.writeFile(dataFilePath, JSON.stringify({ organizations }, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data' });
      }
      res.json(organizations[index]);
    });
  });
});

// Удалить организацию
app.delete('/api/organizations/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    const organizations = JSON.parse(data).organizations;
    const index = organizations.findIndex(org => org.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    organizations.splice(index, 1);

    fs.writeFile(dataFilePath, JSON.stringify({ organizations }, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data' });
      }
      res.status(204).send(); // No content
    });
  });
});

// Добавить сотрудника
app.post('/api/organizations/:orgId/employees', (req, res) => {
  const { orgId } = req.params;
  const newEmployee = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    const organizations = JSON.parse(data).organizations;
    const organization = organizations.find(org => org.id === orgId);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    organization.employees.push(newEmployee);

    fs.writeFile(dataFilePath, JSON.stringify({ organizations }, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data' });
      }
      res.status(201).json(newEmployee);
    });
  });
});

// Обновить сотрудника
app.put('/api/organizations/:organizationId/employees/:employeeId', (req, res) => {
  const { organizationId, employeeId } = req.params;
  const updatedEmployee = req.body; // Обновленные данные сотрудника

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading data:', err);
          return res.status(500).json({ error: 'Failed to read data' });
      }

      let organizations;
      try {
          organizations = JSON.parse(data); // Прямое парсинг всего JSON
      } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          return res.status(500).json({ error: 'Failed to parse JSON' });
      }

      // Найти организацию по ID
      const organizationIndex = organizations.findIndex(org => org.id === organizationId);
      
      if (organizationIndex === -1) {
          return res.status(404).json({ error: 'Organization not found' });
      }

      // Найти сотрудника в найденной организации
      const employeeIndex = organizations[organizationIndex].employees.findIndex(emp => emp.id === employeeId);
      
      if (employeeIndex === -1) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      // Обновляем данные сотрудника
      organizations[organizationIndex].employees[employeeIndex] = {
          ...organizations[organizationIndex].employees[employeeIndex],
          ...updatedEmployee
      };

      // Сохраняем обновленные данные в файл
      fs.writeFile(dataFilePath, JSON.stringify(organizations, null, 2), (err) => {
          if (err) {
              console.error('Error writing data:', err);
              return res.status(500).json({ error: 'Failed to write data' });
          }
          res.json(organizations[organizationIndex].employees[employeeIndex]); // Отправляем обновленные данные в ответ
      });
  });
});




// Удалить сотрудника
app.delete('/api/employees/:employeeId', (req, res) => {
  const { employeeId } = req.params;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    const organizations = JSON.parse(data).organizations;
    let employeeFound = false;

    organizations.forEach(org => {
      const index = org.employees.findIndex(emp => emp.id === employeeId);
      if (index !== -1) {
        org.employees.splice(index, 1);
        employeeFound = true;
      }
    });

    if (!employeeFound) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    fs.writeFile(dataFilePath, JSON.stringify({ organizations }, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data' });
      }
      res.status(204).send(); // No content
    });
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
