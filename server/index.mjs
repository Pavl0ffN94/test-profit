import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { readDataFromFile, writeDataToFile } from './helpers.mjs';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


// Получить данные организаций
app.get('/api/organizations', async (req, res) => {
  try {
    const data = await readDataFromFile();
    res.json(data.organizations);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Получить данные сотрудников по ID организации
app.get('/api/organizations/:id/employees', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await readDataFromFile();
    const organization = data.organizations.find(org => org.id === id);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organization.employees);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Добавить организацию
app.post('/api/organizations', async (req, res) => {
  const newOrganization = req.body;

  try {
    const data = await readDataFromFile();
    data.organizations.push(newOrganization);

    await writeDataToFile(data);
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Обновить организацию
app.put('/api/organizations/:id', async (req, res) => {
  const { id } = req.params;
  const updatedOrganization = req.body;

  try {
    const data = await readDataFromFile();
    const index = data.organizations.findIndex(org => org.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    data.organizations[index] = { ...data.organizations[index], ...updatedOrganization };

    await writeDataToFile(data);
    res.json(data.organizations[index]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Удалить организацию
app.delete('/api/organizations/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await readDataFromFile();
    const index = data.organizations.findIndex(org => org.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    data.organizations.splice(index, 1);

    await writeDataToFile(data);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Добавить сотрудника
app.post('/api/organizations/:orgId/employees', async (req, res) => {
  const { orgId } = req.params;
  const newEmployee = req.body;

  try {
    const data = await readDataFromFile();
    const organization = data.organizations.find(org => org.id === orgId);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    organization.employees.push(newEmployee);

    await writeDataToFile(data);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Обновить сотрудника
app.put('/api/organizations/:organizationId/employees/:employeeId', async (req, res) => {
  const { organizationId, employeeId } = req.params;
  const updatedEmployee = req.body;

  try {
    const data = await readDataFromFile();
    const organization = data.organizations.find(org => org.id === organizationId);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const employeeIndex = organization.employees.findIndex(emp => emp.id === employeeId);

    if (employeeIndex === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    organization.employees[employeeIndex] = { ...organization.employees[employeeIndex], ...updatedEmployee };

    await writeDataToFile(data);
    res.json(organization.employees[employeeIndex]);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Удалить сотрудника
app.delete('/api/organizations/:organizationId/employees/:employeeId', async (req, res) => {
  const { organizationId, employeeId } = req.params;

  try {
    const data = await readDataFromFile();
    const organization = data.organizations.find(org => org.id === organizationId);

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const employeeIndex = organization.employees.findIndex(emp => emp.id === employeeId);

    if (employeeIndex === -1) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    organization.employees.splice(employeeIndex, 1);

    await writeDataToFile(data);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
